import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
const path=resolve(process.env.DATABASE_PATH || './data/appdesk.db'); mkdirSync(dirname(path),{recursive:true})
const db=new Database(path); db.pragma('journal_mode = WAL'); db.pragma('foreign_keys = ON')
db.exec(`CREATE TABLE IF NOT EXISTS companies(id INTEGER PRIMARY KEY,name TEXT NOT NULL,slug TEXT UNIQUE NOT NULL,color TEXT DEFAULT '#1769c2');
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,company_id INTEGER NOT NULL,employee_id TEXT NOT NULL,name TEXT NOT NULL,email TEXT NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN ('PLATFORM_ADMIN','COMPANY_ADMIN','USER')),active INTEGER DEFAULT 1,UNIQUE(company_id,employee_id),UNIQUE(company_id,email),FOREIGN KEY(company_id) REFERENCES companies(id));
CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY,company_id INTEGER NOT NULL,name TEXT NOT NULL,sort_order INTEGER DEFAULT 0,UNIQUE(company_id,name));
CREATE TABLE IF NOT EXISTS applications(id INTEGER PRIMARY KEY,company_id INTEGER NOT NULL,category_id INTEGER,name TEXT NOT NULL,description TEXT,url TEXT NOT NULL,icon TEXT DEFAULT '◫',active INTEGER DEFAULT 1,sort_order INTEGER DEFAULT 0,FOREIGN KEY(company_id) REFERENCES companies(id),FOREIGN KEY(category_id) REFERENCES categories(id));
CREATE TABLE IF NOT EXISTS user_applications(user_id INTEGER NOT NULL,application_id INTEGER NOT NULL,PRIMARY KEY(user_id,application_id));
CREATE TABLE IF NOT EXISTS favorites(user_id INTEGER NOT NULL,application_id INTEGER NOT NULL,sort_order INTEGER DEFAULT 0,PRIMARY KEY(user_id,application_id));
CREATE TABLE IF NOT EXISTS recents(user_id INTEGER NOT NULL,application_id INTEGER NOT NULL,visited_at TEXT NOT NULL,PRIMARY KEY(user_id,application_id));
CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY,user_id INTEGER NOT NULL,expires_at TEXT NOT NULL);`)
export default db