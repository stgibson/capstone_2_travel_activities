const { Sequelize, DataTypes } = require("sequelize");

let sequelize;
const environment = process.env.NODE_ENV || "development";
if (environment === "test") {
  sequelize = new Sequelize(
    "travel_activities_test",
    "postgres",
    "spielberg",
    {
      host: "localhost",
      dialect: "postgres",
      logging: false
    }
  );
}
else if (environment === "development") {
  sequelize = new Sequelize(
    "travel_activities",
    "postgres",
    "spielberg",
    {
      host: "localhost",
      dialect: "postgres"
    }
  );
}
else {
  sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: "postgres" });
}

// set up user model
const User = sequelize.define("user", {
  username: { type: DataTypes.STRING(30), primaryKey: true },
  password: { type: DataTypes.TEXT, allowNull: false }
}, {
  tableName: "users"
});

// set up city model
const City = sequelize.define("city", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: "cities"
});

// set up country model
const Country = sequelize.define("country", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.TEXT, allowNull: false, unique: true }
}, {
  tableName: "countries"
});

// set up activity model
const Activity = sequelize.define("activity", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT },
  rating: { type: DataTypes.TEXT },
  bookingLink: { type: DataTypes.TEXT },
  price: { type: DataTypes.TEXT },
  currencyCode: { type: DataTypes.TEXT }
}, {
  tableName: "activities"
});

// set up travel plan model
const Plan = sequelize.define("plan", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: "plans"
});

// set up day model
const Day = sequelize.define("day", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "days"
});

// set up relationship between cities and countries
Country.hasMany(City, {
  foreignKey: {
    allowNull: false
  },
  onDelete: "CASCADE"
});
City.belongsTo(Country);

// set up relationship between cities and activities
City.hasMany(Activity, {
  foreignKey: {
    allowNull: false
  },
  onDelete: "CASCADE"
});
Activity.belongsTo(City);

// set up relationship between users and plans
User.hasMany(Plan, {
  foreignKey: "username",
  onDelete: "CASCADE"
});
Plan.belongsTo(User, { foreignKey: "username" });

// set up relationship between plans and days
Plan.hasMany(Day, {
  foreignKey: {
    allowNull: false
  },
  onDelete: "CASCADE"
});
Day.belongsTo(Plan);

// set up relationship between users and activities
const UserActivity = sequelize.define("userActivity", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    references: {
      model: User,
      key: "username"
    }
  },
  activityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Activity,
      key: "id"
    }
  }
}, {
  tableName: "users_activities"
});
User.belongsToMany(Activity, {
  through: UserActivity,
  foreignKey: "username",
  otherKey: "activityId"
});
Activity.belongsToMany(User, {
  through: UserActivity,
  foreignKey: "activityId",
  otherKey: "username"
});

// set up relationship between days and activities
const DayActivity = sequelize.define("dayActivity", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dayId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Day,
      key: "id"
    }
  },
  activityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Activity,
      key: "id"
    }
  }
}, {
  tableName: "days_activities"
});
Day.belongsToMany(Activity, { through: DayActivity });
Activity.belongsToMany(Day, { through: DayActivity });

module.exports = {
  sequelize,
  User,
  City,
  Country,
  Activity,
  Plan,
  Day,
  UserActivity,
  DayActivity
};