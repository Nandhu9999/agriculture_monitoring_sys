drop database amsdb;
create database amsdb;
use amsdb;

-- 
-- CREATE TABLE QUERIES
-- 

-- 1. USER tbl
CREATE TABLE `user` (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firebaseId VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    `keys` TEXT NOT NULL,
    isAdmin TINYINT(1) NOT NULL DEFAULT 0
);

-- 2. MODULE tbl
CREATE TABLE `module` (
    moduleId INT AUTO_INCREMENT PRIMARY KEY,
    deviceId VARCHAR(255) NOT NULL,
    moduleName VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    lat FLOAT DEFAULT 10.8993923,
    lng FLOAT DEFAULT 76.9029521,
    `values` TEXT NOT NULL,
    code TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. USER MODULE tbl
CREATE TABLE userModule (
    userId INT NOT NULL,
    moduleId INT NOT NULL,
    PRIMARY KEY (userId, moduleId)
--     FOREIGN KEY (userId) REFERENCES `user`(userId),
--     FOREIGN KEY (moduleId) REFERENCES `module`(moduleId)
);

-- 4. MODULE GROUP tbl
CREATE TABLE moduleGroup (
    moduleGroupId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    groupName VARCHAR(255) NOT NULL,
    modulesArray TEXT NOT NULL,
    description TEXT NOT NULL
);

-- 5. DHT TRACKING tbl
CREATE TABLE dhtTracking (
    trackingId INT AUTO_INCREMENT PRIMARY KEY,
    moduleId INT NOT NULL,
    temperature INT NOT NULL,
    humidity INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
--     FOREIGN KEY (moduleId) REFERENCES `module`(moduleId)
);

-- 6. IMAGE TRACKING tbl
CREATE TABLE imageTracking (
    trackingId INT AUTO_INCREMENT PRIMARY KEY,
    moduleId INT NOT NULL,
    path TEXT NOT NULL,
    result TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (moduleId) REFERENCES `module`(moduleId)
);

-- 
-- INSERT TABLE QUERIES
-- 

INSERT INTO `user` (firebaseId, email, `name`, `keys`, isAdmin) VALUES ('eplLl6oPPSVDzmttktFJkr99GX53','nandhakumar2058@gmail.com', 'nandhakumar vl', '{}', 1);

INSERT INTO module (deviceId, moduleName, description, `values`, code) VALUES
('11223344', 'ESP32 Module', 'This module is used for tracking the humidity and temperature near my potato farm area', '{"deviceType":"esp","battery":100, "lat":0.0, "lng": 0.0, "values":{"temperature": 2800, "humidity": 4000}}', 'import code.c'),
('aabbccdd', 'RPI Module', 'is being used to track and scan for diseases aswell was intruders', '{"deviceType":"rpi","battery":42, "lat":0.0, "lng": 0.0, "values":{"path": ""}}', 'import code.py');

INSERT INTO moduleGroup (userId, groupName, modulesArray, description) VALUES (1, 'central_g1', '', 'all modules group desc');