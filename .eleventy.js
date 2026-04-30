module.exports = function(eleventyConfig) {
    // Copy static assets to the output folder
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/script.js");
    eleventyConfig.addPassthroughCopy("src/favicon.png");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/sitemap.xml");
    eleventyConfig.addPassthroughCopy("src/feed.xml");

    // Simple date filter
    eleventyConfig.addFilter("dateFilter", (dateObj) => {
        if (!dateObj) return "2026.04";
        const d = new Date(dateObj);
        return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    });

    // Simple read time filter (200 words per minute)
    eleventyConfig.addFilter("readTime", (content) => {
        const words = content.split(/\s+/g).length;
        return Math.ceil(words / 200);
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };
};
