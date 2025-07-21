// utils/puppeteerBrowser.js
const puppeteer = require('puppeteer');

class PuppeteerBrowser {
    constructor() {
        this.browser = null;
        this.isInitializing = false;
    }

    async initialize() {
        if (this.browser) {
            return this.browser;
        }

        if (this.isInitializing) {
            // Wait for initialization to complete
            while (this.isInitializing) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            return this.browser;
        }

        this.isInitializing = true;

        try {
            this.browser = await puppeteer.launch({
                headless: true,
                dumpio: true, 
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-extensions',
                    '--disable-background-timer-throttling',
                    '--disable-backgrounding-occluded-windows',
                    '--disable-renderer-backgrounding',
                    '--disable-features=VizDisplayCompositor'
                ],
                timeout: 30000
            });

            console.log('✅ Puppeteer browser initialized successfully');

            this.browser.on('disconnected', () => {
                console.log('⚠️ Browser disconnected, will reinitialize on next request');
                this.browser = null;
            });

        } catch (error) {
            console.error('❌ Failed to initialize Puppeteer browser:', error);
            throw error;
        } finally {
            this.isInitializing = false;
        }

        return this.browser;
    }

    async createPage() {
        const browser = await this.initialize();
        return await browser.newPage();
    }

    async generatePdf(html, options = {}) {
        const page = await this.createPage();

        try {
            await page.setViewport({
                width: 1200,
                height: 1600,
                deviceScaleFactor: 2
            });

           await page.setContent(html, {
    waitUntil: 'domcontentloaded',
    timeout: 30000
});


            const defaultOptions = {
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '0.5in',
                    right: '0.5in',
                    bottom: '0.5in',
                    left: '0.5in'
                },
                preferCSSPageSize: true,
                displayHeaderFooter: false
            };

            const pdfOptions = { ...defaultOptions, ...options };

            const pdfBuffer = await page.pdf(pdfOptions);

            return pdfBuffer;

        } catch (error) {
            console.error('❌ PDF generation failed:', error);
            throw error;
        } finally {
            await page.close();
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            console.log('🔄 Browser closed');
        }
    }

    async getStatus() {
        return {
            isInitialized: !!this.browser,
            isConnected: this.browser ? this.browser.connected : false, // ✅ Fixed deprecated usage
            version: this.browser ? await this.browser.version() : null
        };
    }
}

const puppeteerBrowser = new PuppeteerBrowser();
module.exports = puppeteerBrowser;
