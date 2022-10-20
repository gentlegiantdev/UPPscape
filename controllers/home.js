module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getAbout: (req, res) => {
    res.render("about.ejs");
  },
  getPrivacy: (req, res) => {
    res.render("privacypolicy.ejs");
  },
  getCookie: (req, res) => {
    res.render("privacypolicy.ejs");
  },
  getTerms: (req, res) => {
    res.render("termsofuse.ejs");
  },
  getContact: (req, res) => {
    res.render("contact.ejs");
  },

};
