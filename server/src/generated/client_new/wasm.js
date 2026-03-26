
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.2.1
 * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
 */
Prisma.prismaVersion = {
  client: "6.2.1",
  engine: "4123509d24aa4dede1e864b46351bf2790323b69"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  googleId: 'googleId',
  email: 'email',
  password: 'password',
  displayName: 'displayName',
  avatar: 'avatar',
  role: 'role',
  institution: 'institution',
  department: 'department',
  yearOfStudy: 'yearOfStudy',
  onboarded: 'onboarded',
  points: 'points',
  level: 'level',
  streak: 'streak',
  lastMoodLog: 'lastMoodLog',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MoodScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  score: 'score',
  emotion: 'emotion',
  intensity: 'intensity',
  notes: 'notes',
  activities: 'activities',
  photoUrl: 'photoUrl',
  audioUrl: 'audioUrl',
  transcription: 'transcription',
  sleepHours: 'sleepHours',
  productivity: 'productivity',
  stressLevel: 'stressLevel',
  sentimentScore: 'sentimentScore',
  crisisFlag: 'crisisFlag',
  aiSummary: 'aiSummary',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  score: 'score',
  severity: 'severity',
  responses: 'responses',
  createdAt: 'createdAt'
};

exports.Prisma.CircleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  category: 'category',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CircleMemberScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  circleId: 'circleId',
  role: 'role',
  joinedAt: 'joinedAt'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  content: 'content',
  isAnonymous: 'isAnonymous',
  circleId: 'circleId',
  authorId: 'authorId',
  crisisFlag: 'crisisFlag',
  moderationStatus: 'moderationStatus',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EncouragementScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.UserGoalScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  description: 'description',
  category: 'category',
  status: 'status',
  currentValue: 'currentValue',
  targetValue: 'targetValue',
  unit: 'unit',
  deadline: 'deadline',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BadgeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  icon: 'icon',
  points: 'points'
};

exports.Prisma.UserBadgeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  badgeId: 'badgeId',
  unlockedAt: 'unlockedAt'
};

exports.Prisma.MedicationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  dosage: 'dosage',
  frequency: 'frequency',
  reminders: 'reminders',
  schedule: 'schedule',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.TimeOfDay = exports.$Enums.TimeOfDay = {
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  EVENING: 'EVENING',
  NIGHT: 'NIGHT'
};

exports.Concern = exports.$Enums.Concern = {
  ACADEMIC_STRESS: 'ACADEMIC_STRESS',
  ANXIETY: 'ANXIETY',
  DEPRESSION: 'DEPRESSION',
  LONELINESS: 'LONELINESS',
  RELATIONSHIP_ISSUES: 'RELATIONSHIP_ISSUES',
  FINANCIAL_STRESS: 'FINANCIAL_STRESS',
  FAMILY_PRESSURE: 'FAMILY_PRESSURE',
  OTHER: 'OTHER'
};

exports.SupportLevel = exports.$Enums.SupportLevel = {
  ALONE: 'ALONE',
  SOMEWHAT: 'SOMEWHAT',
  STRONG: 'STRONG'
};

exports.RiskLevel = exports.$Enums.RiskLevel = {
  LOW: 'LOW',
  MODERATE: 'MODERATE',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.CopingStyle = exports.$Enums.CopingStyle = {
  EXERCISE: 'EXERCISE',
  JOURNAL: 'JOURNAL',
  PRAY: 'PRAY',
  TALK: 'TALK',
  MUSIC: 'MUSIC',
  SLEEP: 'SLEEP',
  MEDITATE: 'MEDITATE',
  OTHER: 'OTHER'
};

exports.FaithLevel = exports.$Enums.FaithLevel = {
  VERY_IMPORTANT: 'VERY_IMPORTANT',
  SOMEWHAT_IMPORTANT: 'SOMEWHAT_IMPORTANT',
  NOT_IMPORTANT: 'NOT_IMPORTANT'
};

exports.ApproachPreference = exports.$Enums.ApproachPreference = {
  CLINICAL: 'CLINICAL',
  HOLISTIC: 'HOLISTIC',
  CULTURAL: 'CULTURAL',
  MIXED: 'MIXED'
};

exports.Goal = exports.$Enums.Goal = {
  REDUCE_STRESS: 'REDUCE_STRESS',
  IMPROVE_MOOD: 'IMPROVE_MOOD',
  BUILD_RESILIENCE: 'BUILD_RESILIENCE',
  BETTER_SLEEP: 'BETTER_SLEEP',
  DEVELOP_HABITS: 'DEVELOP_HABITS',
  CONNECT_SUPPORT: 'CONNECT_SUPPORT',
  TRACK_JOURNEY: 'TRACK_JOURNEY',
  PREPARE_COUNSELING: 'PREPARE_COUNSELING',
  BE_MINDFUL: 'BE_MINDFUL',
  IMPROVE_ACADEMICS: 'IMPROVE_ACADEMICS'
};

exports.GoalStatus = exports.$Enums.GoalStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
};

exports.ConversationStatus = exports.$Enums.ConversationStatus = {
  ACTIVE: 'ACTIVE',
  ENDED: 'ENDED',
  ARCHIVED: 'ARCHIVED'
};

exports.MessageRole = exports.$Enums.MessageRole = {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT'
};

exports.AssessmentType = exports.$Enums.AssessmentType = {
  PHQ9: 'PHQ9',
  GAD7: 'GAD7',
  PSS: 'PSS',
  CUSTOM: 'CUSTOM'
};

exports.Severity = exports.$Enums.Severity = {
  MINIMAL: 'MINIMAL',
  MILD: 'MILD',
  MODERATE: 'MODERATE',
  MODERATELY_SEVERE: 'MODERATELY_SEVERE',
  SEVERE: 'SEVERE'
};

exports.Service = exports.$Enums.Service = {
  GEMINI: 'GEMINI',
  CHAT: 'CHAT',
  MOOD: 'MOOD',
  ASSESSMENT: 'ASSESSMENT'
};

exports.Prisma.ModelName = {
  User: 'User',
  Mood: 'Mood',
  Assessment: 'Assessment',
  Circle: 'Circle',
  CircleMember: 'CircleMember',
  Post: 'Post',
  Encouragement: 'Encouragement',
  UserGoal: 'UserGoal',
  Badge: 'Badge',
  UserBadge: 'UserBadge',
  Medication: 'Medication'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\asare\\Desktop\\MindBridge-Mental-Health-Navigator-Project\\server\\src\\generated\\client_new",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "C:\\Users\\asare\\Desktop\\MindBridge-Mental-Health-Navigator-Project\\server\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.2.1",
  "engineVersion": "4123509d24aa4dede1e864b46351bf2790323b69",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"../src/generated/client_new\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DIRECT_URL\")\n}\n\n// ============================================\n// CORE USER MODELS\n// ============================================\n\nmodel User {\n  id          String  @id @default(uuid())\n  googleId    String? @unique\n  email       String  @unique\n  password    String?\n  displayName String\n  avatar      String?\n  role        String  @default(\"user\")\n  institution String?\n  department  String?\n  yearOfStudy Int?\n\n  // Wellness Profile\n  onboarded Boolean @default(false)\n\n  // Social\n  circles        CircleMember[]\n  posts          Post[]\n  encouragements Encouragement[]\n\n  // Health Data\n  moods       Mood[]\n  assessments Assessment[]\n  goals       UserGoal[]\n  medications Medication[]\n\n  // Gamification\n  points      Int         @default(0)\n  level       Int         @default(1)\n  badges      UserBadge[]\n  streak      Int         @default(0)\n  lastMoodLog DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Mood {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  score     Int // 1-10 scale\n  emotion   String // Main emotion from wheel\n  intensity Int // 1-100%\n\n  notes      String?  @db.Text\n  activities String[] // Tagged activities\n\n  // Media Attachments\n  photoUrl      String?\n  audioUrl      String?\n  transcription String? @db.Text\n\n  // Context\n  sleepHours   Float?\n  productivity Int? // 1-10\n  stressLevel  Int? // 1-10\n\n  // AI Insights\n  sentimentScore Float? // -1.0 to 1.0\n  crisisFlag     Boolean @default(false)\n  aiSummary      String? @db.Text\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Assessment {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  type      AssessmentType\n  score     Int\n  severity  Severity\n  responses Json\n\n  createdAt DateTime @default(now())\n}\n\nmodel Circle {\n  id          String  @id @default(uuid())\n  name        String  @unique\n  description String\n  category    String // Academic, Mental Health, Social, etc.\n  icon        String?\n\n  members CircleMember[]\n  posts   Post[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel CircleMember {\n  id       String @id @default(uuid())\n  userId   String\n  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n  circleId String\n  circle   Circle @relation(fields: [circleId], references: [id], onDelete: Cascade)\n  role     String @default(\"member\")\n\n  joinedAt DateTime @default(now())\n\n  @@unique([userId, circleId])\n}\n\nmodel Post {\n  id          String  @id @default(uuid())\n  content     String  @db.Text\n  isAnonymous Boolean @default(true)\n\n  circleId String\n  circle   Circle @relation(fields: [circleId], references: [id], onDelete: Cascade)\n  authorId String\n  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)\n\n  encouragements Encouragement[]\n\n  // Safety\n  crisisFlag       Boolean @default(false)\n  moderationStatus String  @default(\"pending\") // pending, approved, flagged\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Encouragement {\n  id     String @id @default(uuid())\n  postId String\n  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n\n  @@unique([postId, userId])\n}\n\nmodel UserGoal {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  title       String\n  description String?\n  category    String\n  status      GoalStatus @default(ACTIVE)\n\n  currentValue Float   @default(0)\n  targetValue  Float\n  unit         String?\n\n  deadline  DateTime?\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n}\n\nmodel Badge {\n  id          String @id @default(uuid())\n  name        String @unique\n  description String\n  icon        String\n  points      Int    @default(50)\n\n  users UserBadge[]\n}\n\nmodel UserBadge {\n  id      String @id @default(uuid())\n  userId  String\n  user    User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n  badgeId String\n  badge   Badge  @relation(fields: [badgeId], references: [id], onDelete: Cascade)\n\n  unlockedAt DateTime @default(now())\n\n  @@unique([userId, badgeId])\n}\n\nmodel Medication {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  name      String\n  dosage    String\n  frequency String\n  reminders Boolean @default(true)\n  schedule  Json? // {\"time\": \"08:00\", \"days\": [\"mon\", \"wed\"]}\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n// ============================================\n// ENUMS\n// ============================================\n\nenum TimeOfDay {\n  MORNING\n  AFTERNOON\n  EVENING\n  NIGHT\n}\n\nenum Concern {\n  ACADEMIC_STRESS\n  ANXIETY\n  DEPRESSION\n  LONELINESS\n  RELATIONSHIP_ISSUES\n  FINANCIAL_STRESS\n  FAMILY_PRESSURE\n  OTHER\n}\n\nenum SupportLevel {\n  ALONE\n  SOMEWHAT\n  STRONG\n}\n\nenum RiskLevel {\n  LOW\n  MODERATE\n  HIGH\n  CRITICAL\n}\n\nenum CopingStyle {\n  EXERCISE\n  JOURNAL\n  PRAY\n  TALK\n  MUSIC\n  SLEEP\n  MEDITATE\n  OTHER\n}\n\nenum FaithLevel {\n  VERY_IMPORTANT\n  SOMEWHAT_IMPORTANT\n  NOT_IMPORTANT\n}\n\nenum ApproachPreference {\n  CLINICAL\n  HOLISTIC\n  CULTURAL\n  MIXED\n}\n\nenum Goal {\n  REDUCE_STRESS\n  IMPROVE_MOOD\n  BUILD_RESILIENCE\n  BETTER_SLEEP\n  DEVELOP_HABITS\n  CONNECT_SUPPORT\n  TRACK_JOURNEY\n  PREPARE_COUNSELING\n  BE_MINDFUL\n  IMPROVE_ACADEMICS\n}\n\nenum GoalStatus {\n  ACTIVE\n  COMPLETED\n  ARCHIVED\n}\n\nenum ConversationStatus {\n  ACTIVE\n  ENDED\n  ARCHIVED\n}\n\nenum MessageRole {\n  USER\n  ASSISTANT\n}\n\nenum AssessmentType {\n  PHQ9\n  GAD7\n  PSS\n  CUSTOM\n}\n\nenum Severity {\n  MINIMAL\n  MILD\n  MODERATE\n  MODERATELY_SEVERE\n  SEVERE\n}\n\nenum Service {\n  GEMINI\n  CHAT\n  MOOD\n  ASSESSMENT\n}\n",
  "inlineSchemaHash": "13d5e2715da5fb739cff43ca2304e34740d90f5a6f0499b8e410cbf431f91e2d",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"googleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"displayName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"avatar\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"institution\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"department\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"yearOfStudy\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"onboarded\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"circles\",\"kind\":\"object\",\"type\":\"CircleMember\",\"relationName\":\"CircleMemberToUser\"},{\"name\":\"posts\",\"kind\":\"object\",\"type\":\"Post\",\"relationName\":\"PostToUser\"},{\"name\":\"encouragements\",\"kind\":\"object\",\"type\":\"Encouragement\",\"relationName\":\"EncouragementToUser\"},{\"name\":\"moods\",\"kind\":\"object\",\"type\":\"Mood\",\"relationName\":\"MoodToUser\"},{\"name\":\"assessments\",\"kind\":\"object\",\"type\":\"Assessment\",\"relationName\":\"AssessmentToUser\"},{\"name\":\"goals\",\"kind\":\"object\",\"type\":\"UserGoal\",\"relationName\":\"UserToUserGoal\"},{\"name\":\"medications\",\"kind\":\"object\",\"type\":\"Medication\",\"relationName\":\"MedicationToUser\"},{\"name\":\"points\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"level\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"badges\",\"kind\":\"object\",\"type\":\"UserBadge\",\"relationName\":\"UserToUserBadge\"},{\"name\":\"streak\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"lastMoodLog\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Mood\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"MoodToUser\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"emotion\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"intensity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"activities\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"photoUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"audioUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"transcription\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sleepHours\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"productivity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"stressLevel\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"sentimentScore\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"crisisFlag\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"aiSummary\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Assessment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AssessmentToUser\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"AssessmentType\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"severity\",\"kind\":\"enum\",\"type\":\"Severity\"},{\"name\":\"responses\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Circle\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"members\",\"kind\":\"object\",\"type\":\"CircleMember\",\"relationName\":\"CircleToCircleMember\"},{\"name\":\"posts\",\"kind\":\"object\",\"type\":\"Post\",\"relationName\":\"CircleToPost\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"CircleMember\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CircleMemberToUser\"},{\"name\":\"circleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"circle\",\"kind\":\"object\",\"type\":\"Circle\",\"relationName\":\"CircleToCircleMember\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"joinedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Post\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isAnonymous\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"circleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"circle\",\"kind\":\"object\",\"type\":\"Circle\",\"relationName\":\"CircleToPost\"},{\"name\":\"authorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"author\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"PostToUser\"},{\"name\":\"encouragements\",\"kind\":\"object\",\"type\":\"Encouragement\",\"relationName\":\"EncouragementToPost\"},{\"name\":\"crisisFlag\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"moderationStatus\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Encouragement\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"postId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"post\",\"kind\":\"object\",\"type\":\"Post\",\"relationName\":\"EncouragementToPost\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"EncouragementToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"UserGoal\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToUserGoal\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"GoalStatus\"},{\"name\":\"currentValue\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"targetValue\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"unit\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"deadline\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Badge\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"points\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"users\",\"kind\":\"object\",\"type\":\"UserBadge\",\"relationName\":\"BadgeToUserBadge\"}],\"dbName\":null},\"UserBadge\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToUserBadge\"},{\"name\":\"badgeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"badge\",\"kind\":\"object\",\"type\":\"Badge\",\"relationName\":\"BadgeToUserBadge\"},{\"name\":\"unlockedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Medication\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"MedicationToUser\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dosage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"frequency\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reminders\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"schedule\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

