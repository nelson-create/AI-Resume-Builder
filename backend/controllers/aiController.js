const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateSummary = async (req, res) => {
  try {
    const { role, experiences, skills } = req.body;
    
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OpenAI API key not configured' });
    }

    const prompt = `Write a professional 3-sentence resume summary for a ${role}. 
    Consider these past experiences: ${experiences}. 
    Key skills: ${skills}. 
    Make it impactful, action-oriented, and ATS-friendly.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150,
    });

    res.json({ generatedText: response.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating AI content' });
  }
};

exports.enhanceExperience = async (req, res) => {
  try {
    const { title, company, description } = req.body;
    
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OpenAI API key not configured' });
    }

    const prompt = `Rewrite the following job experience into 3-4 professional, impactful bullet points starting with action verbs. Use the XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]) if applicable.
    Role: ${title} at ${company}
    Draft description: ${description}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 250,
    });

    res.json({ generatedText: response.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error enhancing experience' });
  }
};

exports.enhanceProject = async (req, res) => {
  try {
    const { title, company, description } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OpenAI API key not configured' });
    }

    const prompt = `Rewrite the following project description into 3-4 professional bullet points highlighting key features, technologies used, and your contributions. Make it impactful and showcase technical skills.
    Project: ${title}
    Technologies: ${company}
    Draft description: ${description}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 250,
    });

    res.json({ generatedText: response.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error enhancing project' });
  }
};

exports.analyzeAts = async (req, res) => {
  try {
    const { jobDescription, resumeData } = req.body;
    
    if (!jobDescription || !resumeData) {
      return res.status(400).json({ message: 'Job description and resume data are required.' });
    }

    // 1. Extract Keywords from Job Description (simple extraction of words > 4 chars, ignoring common stop words)
    const stopWords = ['their', 'there', 'about', 'would', 'these', 'other', 'which', 'could', 'should']; // Basic stop words list
    const jbWords = jobDescription.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const jobKeywordsSet = new Set(jbWords.filter(w => !stopWords.includes(w)));
    const jobKeywords = Array.from(jobKeywordsSet);

    // 2. Extract Resume Text by section
    const skillsText = (resumeData.skills || []).join(' ').toLowerCase();
    const expText = (resumeData.experience || []).map(e => `${e.title} ${e.description}`).join(' ').toLowerCase();
    const eduText = (resumeData.education || []).map(e => `${e.degree} ${e.fieldOfStudy}`).join(' ').toLowerCase();
    const fullResumeText = `${skillsText} ${expText} ${eduText}`;

    // 3. Keyword Match Calculation
    let matchCount = 0;
    const missingKeywords = [];
    
    jobKeywords.forEach(kw => {
      if (fullResumeText.includes(kw)) {
        matchCount++;
      } else {
        // Collect some missing keywords for feedback (max 5)
        if (missingKeywords.length < 5) {
          missingKeywords.push(kw);
        }
      }
    });

    const keywordMatchPercent = jobKeywords.length > 0 ? (matchCount / jobKeywords.length) * 100 : 100;

    // 4. Section Completeness Calculation
    let skillsScore = resumeData.skills && resumeData.skills.length > 3 ? 100 : (resumeData.skills?.length || 0) * 25;
    let expScore = resumeData.experience && resumeData.experience.length > 0 ? 100 : 0;
    let eduScore = resumeData.education && resumeData.education.length > 0 ? 100 : 0;
    
    if (expScore === 100) {
      // Check if descriptions exist and are adequately long
      const hasGoodDescriptions = resumeData.experience.some(e => e.description && e.description.length > 50);
      if (!hasGoodDescriptions) expScore = 50;
    }

    // 5. Calculate Weighted Score
    // Skills: 30%, Experience: 40%, Education: 10%, Keywords match: 20%
    const finalScore = Math.round(
      (skillsScore * 0.30) +
      (expScore * 0.40) +
      (eduScore * 0.10) +
      (keywordMatchPercent * 0.20)
    );

    // 6. Generate Suggestions
    const suggestions = [];
    if (skillsScore < 100) suggestions.push('Add more relevant skills (aim for at least 4-5).');
    if (expScore === 0) suggestions.push('Add your work experience to drastically improve your ATS ranking.');
    if (expScore === 50) suggestions.push('Expand your experience descriptions with more details and metrics (XYZ format).');
    if (eduScore === 0) suggestions.push('Include your educational background.');
    if (keywordMatchPercent < 50 && jobKeywords.length > 0) suggestions.push('Your resume is missing many key terms from the job description. Try incorporating the missing keywords.');
    
    if (suggestions.length === 0) {
      suggestions.push('Your resume looks well structured and closely matches the job description!');
    }

    res.json({
      score: finalScore > 100 ? 100 : finalScore,
      missingKeywords: missingKeywords,
      suggestions: suggestions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error analyzing ATS score algorithmically' });
  }
};
