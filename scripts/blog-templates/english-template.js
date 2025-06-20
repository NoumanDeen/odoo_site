// Template for English blog posts
module.exports = {
  getTemplate: (slug, title) => {
    return {
      title,
      content: `<h2>Introduction</h2>
      <p>This is a comprehensive article about ${title}. It provides valuable information for businesses considering Odoo ERP implementation in Saudi Arabia.</p>
      
      <h2>Main Section 1</h2>
      <p>Detailed information about the topic, with facts, figures, and practical advice for decision-makers.</p>
      
      <h3>Sub-section 1.1</h3>
      <ul>
        <li>Important point 1</li>
        <li>Important point 2</li>
        <li>Important point 3</li>
      </ul>
      
      <h3>Sub-section 1.2</h3>
      <p>More detailed information with examples and case studies relevant to Saudi businesses.</p>
      
      <h2>Main Section 2</h2>
      <p>Additional information about implementation considerations, costs, and benefits.</p>
      
      <h3>Sub-section 2.1</h3>
      <p>Specific details about implementation timelines, resources required, and expected outcomes.</p>
      
      <h3>Sub-section 2.2</h3>
      <ol>
        <li>Step 1 of the process</li>
        <li>Step 2 of the process</li>
        <li>Step 3 of the process</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Summary of key points and call to action for readers to contact ToDoOps for a consultation.</p>
      
      <p>For more information about our services, please <a href="/en/contact">contact us</a> or learn more about our <a href="/en/services/odoo-implementation">Odoo implementation services</a>.</p>`,
      meta_description: `Learn about ${title} for Saudi businesses. Comprehensive guide with practical advice for decision-makers considering Odoo ERP implementation.`,
      keywords: `odoo, erp, ${slug.replace(/-/g, ' ')}, saudi arabia, implementation, business software`
    };
  }
};