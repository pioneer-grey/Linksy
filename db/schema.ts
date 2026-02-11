import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, integer, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const page = pgTable("page", {
  userName: text("userName").unique().notNull().primaryKey(),
  userId: text("userId").notNull().references(() => user.id),

  primaryTextColor: text("primary_text_color"),
  primaryBackground: text("primary_background"),
  desktopBackgroundColor: text("desktop_background_color"),

  profilePictureShadow: integer("profile_picture_shadow"),
  profilePictureBorder: integer("profile_picture_border"),
  socialIconSize: integer("social_icon_size"),

  cardColor: text("card_color"),
  cardTextColor: text("card_text_color"),
  cardCorner: integer("card_corner"),
  cardBorder: integer("card_border"),
  cardBorderColor: text("card_border_color"),
  cardShadow: integer("card_shadow"),
  cardSpacing: integer("card_spacing"),

  createdAt: timestamp("createdAt").defaultNow()
})

export const header = pgTable("header", {
  userName: text("userName").notNull().references(() => page.userName).primaryKey(),
  name: text("name").default("@username"),
  bio: text("bio"),
  picURL: text("picURL")
})

export const social = pgTable("social",{
    id: uuid("id").defaultRandom().primaryKey(),
    userName: text("user_name")
      .notNull()
      .references(() => page.userName),
    type: text("type").notNull(),
    url: text("url"),
    order: integer("order").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  });

export const block =pgTable("block",{
  id:uuid("id").defaultRandom().primaryKey(),
  userName:text("userName").notNull().references(()=>page.userName),
  title:text("title"),
  url:text("url"),
  type:text("type"),
  order:integer("order").notNull(),
  createdAt:timestamp("createdAt").defaultNow()

})