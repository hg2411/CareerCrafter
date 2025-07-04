import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import connectDB from "./utils/db.js";
import { User } from "./models/user.model.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import authRoute from "./routes/auth.route.js";
import resumeRoutes from "./routes/resume.route.js";
import notificationRoutes from "./routes/notification.route.js";

dotenv.config();

const app = express();

// ✅ 1. CORS must come first
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions)); // ✅ must come before session

// ✅ 2. General Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ 3. Session middleware (after CORS)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // for local development
      httpOnly: true,
      sameSite: "lax", // ✅ allows cross-site cookie from 5173 to 8000
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ✅ 4. Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Temporary user until role is selected
          const tempUser = {
            fullname: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          };
          return done(null, { temp: true, ...tempUser });
        }

        return done(null, user);
      } catch (err) {
        console.error("Google Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  if (user._id) {
    done(null, user._id); // DB user
  } else {
    done(null, user); // Temp user
  }
});

passport.deserializeUser(async (data, done) => {
  try {
    if (data.temp) {
      return done(null, data); // temp user, not in DB yet
    }

    const user = await User.findById(data);
    return done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// ✅ 5. Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/auth", authRoute); // contains login, logout, role
app.use("/api/v1/resume",resumeRoutes);
app.use("/api/v1/notifications",notificationRoutes);

// ✅ 6. Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at port ${PORT}`);
});
