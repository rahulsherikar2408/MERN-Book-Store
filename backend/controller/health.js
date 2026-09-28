
export const getHealth = (req, res) => {
    return res.status(200).json({
    status: "OK",
    message: "Server is running",
  });
}