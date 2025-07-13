import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "./models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/user/auth/google/callback", // ✅ adjust if needed
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        // 1️⃣ Try to find user by googleId
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // 2️⃣ If not found, try to find user by email
        const existingUserByEmail = await User.findOne({ email: profile.emails?.[0]?.value });

        if (existingUserByEmail) {
          // Link Google ID to the existing email account
          existingUserByEmail.googleId = profile.id;
          existingUserByEmail.profile.profilePhoto = profile.photos?.[0]?.value;
          user = await existingUserByEmail.save();
        } else {
          // 3️⃣ Create new user
          user = await User.create({
            fullname: profile.displayName,
            email: profile.emails?.[0]?.value,
            googleId: profile.id,
            role: "student",
            profile: {
              profilePhoto: profile.photos?.[0]?.value,
            },
          });
        }
      }

        return done(null, user);
      } catch (err) {
        console.error("Google Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

// ✅ Optional (good practice, even if you use JWT not session)
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
