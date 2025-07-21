// 📁 index.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const generateDefaultTemplate = require('./templates/defaultTemplate'); // ✅ Correct import
const puppeteerBrowser = require('./utils/puppeteerBrowser');

const app = express();
const PORT = process.env.PORT || 3001;

// Multer upload configuration
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', async (req, res) => {
  const status = await puppeteerBrowser.getStatus();
  res.json({ status: 'OK', ...status });
});

// Generate PDF endpoint
app.post('/generate-pdf', upload.single('photo'), async (req, res) => {
  let photoPath = null;

  try {
    const { template = 'default' } = req.body;
    const cvData = JSON.parse(req.body.cvData);

    if (req.file) {
      photoPath = path.resolve(req.file.path);
    }

    const html = generateDefaultTemplate(cvData, photoPath); // ✅ Fixed function call
    const pdfBuffer = await puppeteerBrowser.generatePdf(html);

    // Clean up uploaded photo
    if (photoPath && fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="cv.pdf"');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('❌ Error generating PDF:', error);

    if (photoPath && fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    res.status(500).json({
      error: 'Failed to generate PDF',
      message: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PDF Service running on http://localhost:${PORT}`);
});
