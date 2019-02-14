module.exports = (req, res) => {
  res.status(400).send(`
    <h2>Code 400</h2>
    <p>Invalid request/URL.</p>
  `);
};
