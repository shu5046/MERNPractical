const users = [
  { email: "test@scaleboard.com", password: "1234", role: "employee" },
];


exports.profile= (req, res) => {
  const email = req.user.email;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({
    email: user.email,
    name: user.name,
    role: user.role,
  });
};
