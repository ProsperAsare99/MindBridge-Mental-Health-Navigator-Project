
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
  email: 'email',
  password: 'password',
  name: 'name',
  institution: 'institution',
  studentId: 'studentId',
  course: 'course',
  phoneNumber: 'phoneNumber',
  googleId: 'googleId',
  isVerified: 'isVerified',
  isAnonymous: 'isAnonymous',
  image: 'image',
  verificationToken: 'verificationToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  onboardingStep: 'onboardingStep',
  onboardingCompleted: 'onboardingCompleted',
  nickname: 'nickname',
  yearOfStudy: 'yearOfStudy',
  fieldOfStudy: 'fieldOfStudy',
  preferredLanguage: 'preferredLanguage',
  notificationPreference: 'notificationPreference',
  checkInTime: 'checkInTime',
  wellbeingBaseline: 'wellbeingBaseline',
  reasonsForJoining: 'reasonsForJoining',
  hasSupportSystem: 'hasSupportSystem',
  previousProfessionalSupport: 'previousProfessionalSupport',
  selfHarmRisk: 'selfHarmRisk',
  emergencyContacts: 'emergencyContacts',
  copingStyles: 'copingStyles',
  academicStressors: 'academicStressors',
  spiritualityImportance: 'spiritualityImportance',
  preferredApproach: 'preferredApproach',
  goals: 'goals',
  trackingFrequency: 'trackingFrequency',
  trackingMetrics: 'trackingMetrics',
  dataSharingConsent: 'dataSharingConsent',
  dataVisibility: 'dataVisibility',
  preferredTheme: 'preferredTheme',
  dashboardLayout: 'dashboardLayout'
};

exports.Prisma.ChatMessageScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  content: 'content',
  role: 'role',
  createdAt: 'createdAt'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  score: 'score',
  severity: 'severity',
  createdAt: 'createdAt'
};

exports.Prisma.MoodScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  value: 'value',
  note: 'note',
  sentimentScore: 'sentimentScore',
  sentimentLabel: 'sentimentLabel',
  crisisFlag: 'crisisFlag',
  createdAt: 'createdAt'
};

exports.Prisma.AcademicEventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  type: 'type',
  date: 'date',
  importance: 'importance',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  ChatMessage: 'ChatMessage',
  Assessment: 'Assessment',
  Mood: 'Mood',
  AcademicEvent: 'AcademicEvent'
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
      "value": "C:\\Users\\asare\\Desktop\\MindBridge-Mental-Health-Navigator-Project\\server\\src\\generated\\client",
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
    "rootEnvPath": "../../../.env",
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
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"../src/generated/client\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DIRECT_URL\")\n}\n\nmodel User {\n  id                String   @id @default(uuid())\n  email             String   @unique\n  password          String?\n  name              String?\n  institution       String?\n  studentId         String?\n  course            String?\n  phoneNumber       String?\n  googleId          String?  @unique\n  isVerified        Boolean  @default(false)\n  isAnonymous       Boolean  @default(false)\n  image             String?\n  verificationToken String?\n  createdAt         DateTime @default(now())\n  updatedAt         DateTime @updatedAt\n\n  // Onboarding & Personalization\n  onboardingStep              Int      @default(1)\n  onboardingCompleted         Boolean  @default(false)\n  nickname                    String?\n  yearOfStudy                 String?\n  fieldOfStudy                String? // Can correspond to 'course' but used for broader categorization\n  preferredLanguage           String?\n  notificationPreference      String?\n  checkInTime                 String?\n  wellbeingBaseline           String?\n  reasonsForJoining           String[] @default([])\n  hasSupportSystem            String?\n  previousProfessionalSupport String?\n  selfHarmRisk                String?\n  emergencyContacts           Json?\n  copingStyles                String[] @default([])\n  academicStressors           Json?\n  spiritualityImportance      String?\n  preferredApproach           String?\n  goals                       String[] @default([])\n  trackingFrequency           String?\n  trackingMetrics             String[] @default([])\n  dataSharingConsent          Boolean?\n  dataVisibility              String?\n  preferredTheme              String?\n  dashboardLayout             String?\n\n  assessments  Assessment[]\n  moods        Mood[]\n  chatMessages ChatMessage[]\n}\n\nmodel ChatMessage {\n  id        String   @id @default(uuid())\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  content   String   @db.Text\n  role      String // 'user' or 'assistant'\n  createdAt DateTime @default(now())\n}\n\nmodel Assessment {\n  id        String   @id @default(uuid())\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  type      String\n  score     Int\n  severity  String\n  createdAt DateTime @default(now())\n}\n\nmodel Mood {\n  id             String   @id @default(uuid())\n  userId         String\n  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  value          Int // 1-5 (Awful to Great)\n  note           String?\n  sentimentScore Float?\n  sentimentLabel String?\n  crisisFlag     Boolean  @default(false)\n  createdAt      DateTime @default(now())\n}\n\nmodel AcademicEvent {\n  id         String   @id @default(uuid())\n  title      String\n  type       String // 'exam', 'deadline', 'holiday'\n  date       DateTime\n  importance Int      @default(1) // 1-5\n  createdAt  DateTime @default(now())\n}\n",
  "inlineSchemaHash": "7e72a9ef44ffeb320ddef98ff88243a21747017eb47a382d7fc4efa90e1f403d",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"institution\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"studentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"course\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phoneNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"googleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isVerified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isAnonymous\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"verificationToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"onboardingStep\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"onboardingCompleted\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"nickname\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"yearOfStudy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fieldOfStudy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"preferredLanguage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notificationPreference\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"checkInTime\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"wellbeingBaseline\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reasonsForJoining\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hasSupportSystem\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"previousProfessionalSupport\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"selfHarmRisk\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emergencyContacts\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"copingStyles\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"academicStressors\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"spiritualityImportance\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"preferredApproach\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"goals\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"trackingFrequency\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"trackingMetrics\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dataSharingConsent\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"dataVisibility\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"preferredTheme\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dashboardLayout\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"assessments\",\"kind\":\"object\",\"type\":\"Assessment\",\"relationName\":\"AssessmentToUser\"},{\"name\":\"moods\",\"kind\":\"object\",\"type\":\"Mood\",\"relationName\":\"MoodToUser\"},{\"name\":\"chatMessages\",\"kind\":\"object\",\"type\":\"ChatMessage\",\"relationName\":\"ChatMessageToUser\"}],\"dbName\":null},\"ChatMessage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ChatMessageToUser\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Assessment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AssessmentToUser\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"severity\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Mood\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"MoodToUser\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"note\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sentimentScore\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"sentimentLabel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"crisisFlag\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"AcademicEvent\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"date\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"importance\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
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

