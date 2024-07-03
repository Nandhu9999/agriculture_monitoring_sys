use amsdb;
show tables;

select * from `user`;
select * from module;
select * from userModule;
select * from moduleGroup;

INSERT INTO userModule (userId, moduleId) VALUES (1,1), (1,2);

-- SELECT * FROM module WHERE moduleId IN (SELECT moduleId FROM userModule WHERE userId = 1);
SELECT module.moduleId, deviceId, moduleName, `description`, lat, lng, `values`, `code`, createdAt FROM module INNER JOIN userModule WHERE module.moduleId = userModule.moduleId AND userId = 1;

SELECT moduleId, deviceId, moduleName, description, lat, lng, `values`, code, createdAt 
FROM module 
WHERE moduleId 
IN (
  SELECT moduleId 
  FROM userModule 
  WHERE userId = 1
);

SELECT * FROM module WHERE moduleId IN (1, 2);