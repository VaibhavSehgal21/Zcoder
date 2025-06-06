const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    college: req.body.college,
    email: req.body.email,
    userhandle: req.body.userhandle,
    profile_image: req.body.profile_image,
    password: req.body.password,
    bookmark: [],
  });

  try {
    await user.save();}