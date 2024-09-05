/* eslint-disable no-async-promise-executor */
//import express framework (bắt buộc)
const express = require("express");
const cors = require("cors");

const axios = require("axios");

//import verifyToken fuction
const { verifyToken } = require("../authenticate");

//import model Course
const Course = require("../models/courseInfor");

//import library to connect ggcloud storage
const { Storage } = require("@google-cloud/storage");

//import library to read stream file in ggcloud storage
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
// Set the path for ffprobe explicitly
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

//authenticate ggcloud storage
const storage = new Storage({
  projectId: "project-elearning-424401",
  credentials: {
    type: "service_account",
    project_id: "project-elearning-424401",
    private_key_id: "24be9edf7c340e3d0ac5a882dc0028e07ba630a9",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDB/9iCxagjIiJ8\nLrd6Yix+Rz0/T62vkvcvtTXWr65D4Yud2BKfRjxNeR2zLmC0iQnJzZ4UOwNlkLVz\nvzKF3yfXGnbnTLobw54MfRa1PriS2FodKw35hsZjpShlzhcZUGXgOCTfrAF/LjA8\nzq5EPOxreShDO+wJ1ywVWkdpvoNjES7PywjzkhkzvGdt8lYLDqjZ29SUPM0Tkevn\nyvDyZx9v3k6GskzhNC+jHj8pgF60b68yZBsa3xRIAnM5CQeFPykaHlDhVz72oxZI\nfNtXNJEb8DNyipJWHUk3mAPuGHw6XjJZc4cUa7hbJn1qbDnjEAxreY77TOBCCz5i\nmEVnmWZnAgMBAAECggEABZrkQQb/8B/s2iSpZW5PtchOIzWkoYWAAc9dAlpqEQkD\ntShIhXSMinp82q/02FJ7R2ra7d+0nesb6v+zsH19k6/ujok/eUziFJ9KmCr7Pzbk\nB6K2USbNNZTQgXx+W1tgziUhH5tDIc8OUrtv+oW+GO7TtHmXPMOMQQOuO4ZnGmYY\nS//hC8CDLDI5SbgScyQUOsvLYNavTN9HsoD31uoFCcR4+NyF2T9aAGwBpx6MJEXI\n0o0CrIBUT/xoM0yearJQKsTH94twTrVhqfB/rOcfsMFPBiXzmh7HgmSC27RNqA58\nvTwffkyD+rdiilxaMZ8XeOS4C3WgioS3I90EFHDJ6QKBgQDrcNxLLM5gtMkp9hqP\n0T/WcZIwGqfyfZWtPgsRq6+Aa4nE8KJsAeKnXhmOnDaBKQvumwZvTc/Ev5QpiefC\n3FSNYrT757C2TUgIPLLojHzj0KuU71gruMk5ExzSQfLKJFDLo44KDNktkeIRC82J\n6RcLj71mWZWrCQf7h9CXyEoHCQKBgQDS8JYLXPaQ2rJqBii8ZSKpurA8N921IMGx\nresW7Tv838Hhn5ghh1gflpwrokjziemWOoGr3fWUk8IExapDd87X3n23FfzPnw4T\nem103fFk+o3cCLWlRQ8pVXz8PVRbtnJsOULhW6pMssZh/l9W0Oar0eg9+BW2UYRJ\nmptXKw5t7wKBgQCd+AeW2OVPtX0TjnCb9kXi2CjB5eCxrtlyd6JtpMgIXh796IbR\n+SHeMiDrspxPZP8AhTt4CrlQxUnf5Qt/jt2cT5InQnkqmAewnylbJofVQvkc4MpD\n66P3i39XA7CnOF6Ng5uV2rENBkisL0MlOSOhOjxWI91r+I9GkQXAET66IQKBgQC3\n/KczNBvQTyEtfz/Ky4AHgVG0xJm6Id8wpl0We0hGkbjfnj+ohw/jRY/kM0HkQpee\ntFtkWE6bEKI7XVncTUT6XxNSPXhsc/RoIvIT7H5gMHbJxEMD64+E4w8ISEorUKDP\nKsbeIAETsx98W842wDFjDsy+OIRfqQx00sjJqEGGuwKBgQCWtJh6zku3KTXkTBN6\nhRRlxRt590AcKMoLTx7xpdewvX3jL8VGNJsOgCvDld5kc1BVkeSLCTVzeAm6+OOe\n5D7TtZhYI4MKJen+hx3Mu/uLfWjI5b4MXKTJk/DS0wiF4I7SlghWJBINH6u1uj4T\n2yh5gKlpS4tH3JyqjrlR4fEDTA==\n-----END PRIVATE KEY-----\n",
    client_email:
      "nodejs-goocloudstorage@project-elearning-424401.iam.gserviceaccount.com",
    client_id: "112818077253194123938",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/nodejs-goocloudstorage%40project-elearning-424401.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  }
});

module.exports = (connMysql, connMongo) => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router();
  router.use(cors());
  router.use(express.json());

  //Function format 1981-05-11T17:00:00.000Z to 1981-05-12
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  //Function format 1981-05-11T17:00:00.000Z to 1981-05-12 12:00:00
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  // Define your asynchronous functions
  const updateStatusOfCourse = async (courseID, status) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        //Get information from mysql
        let query = "UPDATE course SET status = ? WHERE courseID = ?";
        connection.query(query, [status, courseID], async (error, results) => {
          connection.release(); //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(err);
          }
          //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
          if (results.affectedRows > 0) resolve(true);
        });
      });
    });
  };

  const deleteCourse = async (database_table, courseID) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        //Get information from mysql
        let query = "DELETE FROM ?? WHERE courseID = ?";
        connection.query(
          query,
          [database_table, courseID],
          async (error, results) => {
            connection.release(); //Giải phóng connection khi truy vấn xong
            if (error) {
              reject(err);
            }
            //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
            if (results.affectedRows > 0) resolve(true);
          }
        );
      });
    });
  };

  const addTerminateCourse = async (courseID, dateRange) => {
    const to_time = dateRange[0];
    const end_time = dateRange[1] == "" ? null : dateRange[1];

    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        //Get information from mysql
        let query =
          "INSERT INTO terminated_course (courseID, to_time, end_time)\
                     VALUES (?, ?, ?)";
        connection.query(
          query,
          [courseID, to_time, end_time],
          async (error, results) => {
            connection.release(); //Giải phóng connection khi truy vấn xong
            if (error) {
              reject(err);
            }
            //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
            if (results.affectedRows > 0) resolve(true);
          }
        );
      });
    });
  };

  const addPublishCourse = async (courseID, time) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        //Get information from mysql
        let query =
          "INSERT INTO published_course (courseID, time)\
                     VALUES (?, ?)";
        connection.query(query, [courseID, time], async (error, results) => {
          connection.release(); //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(err);
          }
          //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
          if (results.affectedRows > 0) resolve(true);
        });
      });
    });
  };

  const addCreateCourse = async (courseID, time) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        //Get information from mysql
        let query =
          "INSERT INTO created_course (courseID, time)\
                     VALUES (?, ?)";
        connection.query(query, [courseID, time], async (error, results) => {
          connection.release(); //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(err);
          }
          //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
          if (results.affectedRows > 0) resolve(true);
        });
      });
    });
  };

  const getReview = async (courseID) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        const query = ` SELECT u.fullname AS reviewerName, message, star, time AS date
          FROM rating AS r
          LEFT JOIN user AS u ON r.userID = u.userID
          WHERE courseID = ?`;
        connection.query(query, [courseID], (error, reviews) => {
          connection.release();
          if (error) {
            return reject(error);
          }

          const finalData = reviews.map((rv) => {
            return {
              ...rv,
              date: formatDateTime(rv.date)
            };
          });

          resolve(finalData);
        });
      });
    });
  };

  const getTotalVideo = async (courseID) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const [files] = await storage
        .bucket("e-learning-bucket")
        .getFiles({ prefix: courseID });

      let totalVideo = 0;

      for (const file of files) {
        if (file.name.endsWith(".mp4")) {
          totalVideo += 1;
        }
      }
      resolve(totalVideo);
    });
  };

  // Put file PDf to google cloud Storage
  const putFileToStorage = async (courseID, file) => {
    const bucketName = "e-learning-bucket"

    // The path to your file to upload
    const filePath = 'D:\\Nam4\\KLTN\\project_website_eLearning\\server\\routes\\testApi.pdf'; // Assuming `file` has a `path` property

    // The new ID for your GCS file
    const destFileName = 'C045/Testuploadfile.pdf' // Assuming `file` has an `originalname` property

    try {
      const options = {
        destination: destFileName,
        // Optional:
        // Set a generation-match precondition to avoid potential race conditions
        // and data corruptions. The request to upload is aborted if the object's
        // generation number does not match your precondition. For a destination
        // object that does not yet exist, set the ifGenerationMatch precondition to 0
        // If the destination object already exists in your bucket, set instead a
        // generation-match precondition using its generation number.
        preconditionOpts: { ifGenerationMatch: 0 }
      };

      await storage.bucket(bucketName).upload(filePath, options);
      console.log(`https://storage.googleapis.com/${bucketName}/${destFileName}`);
    } catch (error) {
      console.error("Error uploading file to Google Cloud Storage:", error);
      throw error;
    }
  };

  const getProgress = async (courseID, userID) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        const query = ` SELECT FORMAT(SUM(percent)/num_lecture,1) AS progress
          from course inner join (
            SELECT lectureID, courseID, MAX(percent) AS percent 
              FROM learning
              where userID = ?
            group by lectureID, courseID
          ) AS list_progress
          ON course.courseID = list_progress.courseID
          where course.courseID = ?`;
        connection.query(query, [userID, courseID], (error, data) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(data[0].progress);
        });
      });
    });
  };

  const getListLearning = async (courseID, userID) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        const query = ` SELECT lectureID, MAX(percent) AS progress FROM learning
          where courseID = ? and userID = ?
          group by lectureID 
          order by lectureID asc;`;
        connection.query(query, [courseID, userID], (error, learning) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(learning);
        });
      });
    });
  };

  const isInstructorOfCourse = async (courseID, userID) => {
    return new Promise((resolve) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        }

        const query = `SELECT count(*) AS count FROM course where userID = ? and courseID = ?`;
        connection.query(query, [userID, courseID], (error, data) => {
          connection.release();
          if (error) {
            resolve(false);
          }
          if (data[0].count > 0) {
            resolve(true);
          }
          resolve(false);
        });
      });
    });
  };

  const isEnrolledCourse = async (courseID, userID) => {
    return new Promise((resolve) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        }

        const query = `SELECT count(*) AS count FROM enroll where userID = ? and courseID = ?`;
        connection.query(query, [userID, courseID], (error, data) => {
          connection.release();
          if (error) {
            resolve(false);
          }
          if (data[0].count > 0) {
            resolve(true);
          }
          resolve(false);
        });
      });
    });
  };

  const isAdmin = async (userID) => {
    return new Promise((resolve) => {
      if (userID[0] === "A") resolve(true);
      else resolve(false);
    });
  };

  const checkAcessCourse = async (courseID, userID) => {
    return new Promise(async (resolve) => {
      if ((await isAdmin(userID)) == true) {
        resolve(true);
      } else if ((await isInstructorOfCourse(courseID, userID)) == true) {
        resolve(true);
      } else if ((await isEnrolledCourse(courseID, userID)) == true) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  };

  const callAPICompile = async (language, sourceCode, testcase) => {
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language,
          version: "*",
          files: [
            {
              content: sourceCode
            }
          ],
          stdin: testcase
        }
      );
      return response.data.run.output.trim();
    } catch (error) {
      return "error";
    }
  };

  const compareResult = async (output, key) => {
    return output === key ? true : false;
  };

  // Define user-related routes
  router.get("/getPublishCourse", verifyToken, async (req, res) => {
    if ((await isAdmin(req.userID)) === false) {
      res.status(401).send("error");
    } else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err);
        } else {
          //Get information from mysql
          let query = `SELECT 
                        s.courseID,
                        title,
                        method,
                        program,
                        u.fullname AS teacher,
                        s.time
                      FROM published_course AS s
                      LEFT JOIN course AS c 
                        ON s.courseID = c.courseID
                      LEFT JOIN user AS u 
                        ON c.userID = u.userID
                      ORDER BY s.time DESC`;
          connection.query(query, async (error, courses) => {
            connection.release(); //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error);
            }

            //List courseIDs which is results of previous query
            const courseIDs = courses.map((course) => course.courseID);

            //Connect to MongoDB server
            await connMongo;
            //Get image_introduce of each courseID
            const mongoData = await Course.find({
              courseID: { $in: courseIDs }
            }).select("courseID image_introduce");

            //Merge data with Mysql and MongoDB
            const mergeData = courses.map((course) => {
              const data = mongoData.find(
                (mc) => mc.courseID === course.courseID
              );
              return {
                ...course,
                time: formatDate(course.time),
                image_introduce: data ? data.image_introduce : null
              };
            });
            res.send(mergeData);
          });
        }
      });
    }
  });

  router.get("/getMonitorCourse", verifyToken, async (req, res) => {
    if ((await isAdmin(req.userID)) === false) {
      res.status(401).send("error");
    } else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err);
        } else {
          //Get information from mysql
          let query = `SELECT 
                        s.courseID,
                        title,
                        method,
                        program,
                        u.fullname AS teacher,
                        s.time
                      FROM send_mornitor AS s
                      LEFT JOIN course AS c 
                        ON s.courseID = c.courseID
                      LEFT JOIN user AS u 
                        ON c.userID = u.userID
                      ORDER BY s.time DESC`;
          connection.query(query, async (error, courses) => {
            connection.release(); //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error);
            }

            //List courseIDs which is results of previous query
            const courseIDs = courses.map((course) => course.courseID);

            //Connect to MongoDB server
            await connMongo;
            //Get image_introduce of each courseID
            const mongoData = await Course.find({
              courseID: { $in: courseIDs }
            }).select("courseID image_introduce");

            //Merge data with Mysql and MongoDB
            const mergeData = courses.map((course) => {
              const data = mongoData.find(
                (mc) => mc.courseID === course.courseID
              );
              return {
                ...course,
                time: formatDate(course.time),
                image_introduce: data ? data.image_introduce : null
              };
            });
            res.send(mergeData);
          });
        }
      });
    }
  });

  router.get("/getTerminateCourse", verifyToken, async (req, res) => {
    if ((await isAdmin(req.userID)) === false) {
      res.status(401).send("error");
    } else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err);
        } else {
          //Get information from mysql
          let query = `SELECT 
                        s.courseID,
                        title,
                        method,
                        program,
                        u.fullname AS teacher,
                        s.to_time,
                        s.end_time
                      FROM terminated_course AS s
                      LEFT JOIN course AS c 
                        ON s.courseID = c.courseID
                      LEFT JOIN user AS u 
                        ON c.userID = u.userID
                      ORDER BY s.to_time DESC, s.end_time ASC`;
          connection.query(query, async (error, courses) => {
            connection.release(); //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error);
            }

            //List courseIDs which is results of previous query
            const courseIDs = courses.map((course) => course.courseID);

            //Connect to MongoDB server
            await connMongo;
            //Get image_introduce of each courseID
            const mongoData = await Course.find({
              courseID: { $in: courseIDs }
            }).select("courseID image_introduce");

            //Merge data with Mysql and MongoDB
            const mergeData = courses.map((course) => {
              const data = mongoData.find(
                (mc) => mc.courseID === course.courseID
              );
              return {
                ...course,
                to_time: formatDate(course.to_time),
                end_time: course.end_time
                  ? formatDate(course.end_time)
                  : "permanently",
                image_introduce: data ? data.image_introduce : null
              };
            });
            res.send(mergeData);
          });
        }
      });
    }
  });

  router.post("/terminated", verifyToken, async (req, res) => {
    if ((await isAdmin(req.userID)) === false) {
      res.status(401).send("error");
    } else {
      const courseID = req.body.course;
      const dateRange = req.body.dateRange;

      try {
        await Promise.all([
          updateStatusOfCourse(courseID, "terminated"),
          deleteCourse("published_course", courseID),
          addTerminateCourse(courseID, dateRange)
        ]);
        // Proceed to the next step here
        res.send(true);
      } catch (error) {
        res.send(false);
      }
    }
  });

  router.post("/republish", verifyToken, async (req, res) => {
    const courseID = req.body.course;
    const time = formatDateTime(new Date());

    try {
      await Promise.all([
        updateStatusOfCourse(courseID, "published"),
        deleteCourse("terminated_course", courseID),
        addPublishCourse(courseID, time)
      ]);
      // Proceed to the next step here
      res.send(true);
    } catch (error) {
      res.send(false);
    }
  });

  router.post("/publish", verifyToken, async (req, res) => {
    if ((await isAdmin(req.userID)) === false) {
      res.status(401).send("error");
    } else {
      const courseID = req.body.course;
      const time = formatDateTime(new Date());

      try {
        await Promise.all([
          updateStatusOfCourse(courseID, "published"),
          deleteCourse("send_mornitor", courseID),
          addPublishCourse(courseID, time)
        ]);
        // Proceed to the next step here
        res.send(true);
      } catch (error) {
        res.send(false);
      }
    }
  });

  router.post("/reject", verifyToken, async (req, res) => {
    if ((await isAdmin(req.userID)) === false) {
      res.status(401).send("error");
    } else {
      const courseID = req.body.course;
      const time = formatDateTime(new Date());

      try {
        await Promise.all([
          updateStatusOfCourse(courseID, "created"),
          deleteCourse("send_mornitor", courseID),
          addCreateCourse(courseID, time)
        ]);
        // Proceed to the next step here
        res.send(true);
      } catch (error) {
        res.send(false);
      }
    }
  });

  router.get("/loadInforCourse", async (req, res) => {
    const { courseID } = req.query;
    connMysql.getConnection((err, connection) => {
      if (err) {
        res.status(500).send(err);
      } else {
        //Get detail information of course
        let query =
          "SELECT c.courseID,\
                      u.fullname AS instructor,\
                      type_of_course,\
                      title,\
                      method,\
                      c.language,\
                      price,\
                      currency,\
                      program,\
                      category,\
                      course_for,\
                      status,\
                      num_lecture,\
                      avg.star,\
                      num.number_enrolled\
                      FROM course AS c\
                      LEFT JOIN user AS u ON c.userID = u.userID\
                      LEFT JOIN avg_rating AS avg ON c.courseID = avg.courseID\
                      LEFT JOIN (SELECT courseID, count(*) AS number_enrolled\
                                FROM enroll\
                                GROUP BY courseID) AS num\
                                ON num.courseID = c.courseID\
                      WHERE c.courseID = ?";
        connection.query(query, [courseID], async (error, courseInfor) => {
          connection.release(); //Giải phóng connection khi truy vấn xong
          if (error) {
            res.status(500).send(error);
          } else {
            //Connect to MongoDB server
            await connMongo;
            //Get mongoData. MongoData wil be return an array which 1 element so we will get data at index 0
            const mongoData = await Course.find({
              courseID: { $in: courseID }
            }).select();

            //Get review of this course
            const review = await getReview(courseID);

            //Get duraion time of course
            const videos = await getTotalVideo(courseID);

            //Merge data with Mysql + MongoDB + Reviewer + Duration
            const mergeData = courseInfor.map((course) => {
              return {
                ...course,
                videos: videos,
                review: review,
                image_introduce: mongoData[0].image_introduce,
                video_introduce: mongoData[0].video_introduce,
                keywords: mongoData[0].keywords,
                targets: mongoData[0].targets,
                requirements: mongoData[0].requirements,
                chapters: mongoData[0].chapters
              };
            });
            res.send(mergeData);
            // console.log(mergeData)
          }
        });
      }
    });
  });

  router.get("/loadDetailsCourse", verifyToken, async (req, res) => {
    const { courseID } = req.query;
    const userID = req.userID;
    const checkAuthor = await checkAcessCourse(courseID, userID);
    // console.log(checkAuthor)
    if (checkAuthor === false) {
      res.status(401).send("Not authorize");
    } else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err);
        }
        //Get detail information of course
        let query =
          "SELECT c.courseID,\
                      u.fullname AS instructor,\
                      type_of_course,\
                      title,\
                      program,\
                      category,\
                      course_for,\
                      num_lecture,\
                      avg.star,\
                      num.number_enrolled\
                    FROM course AS c\
                    LEFT JOIN user AS u ON c.userID = u.userID\
                    LEFT JOIN avg_rating AS avg ON c.courseID = avg.courseID\
                    LEFT JOIN (SELECT courseID, count(*) AS number_enrolled\
                                FROM enroll\
                                GROUP BY courseID) AS num\
                                ON num.courseID = c.courseID\
                    WHERE c.courseID = ?";
        connection.query(query, [courseID], async (error, courseInfor) => {
          connection.release(); //Giải phóng connection khi truy vấn xong
          if (error) {
            res.status(500).send(error);
          }

          //Connect to MongoDB server
          await connMongo;
          //Get mongoData. MongoData wil be return an array which 1 element so we will get data at index 0
          const mongoData = await Course.find({
            courseID: { $in: courseID }
          }).select("keywords chapters");

          //Get review of this course
          const review = await getReview(courseID);

          //Get duraion time of course
          const videos = await getTotalVideo(courseID);

          //Get total_progress of user for this course
          const progress = await getProgress(courseID, userID);

          const list_learning = await getListLearning(courseID, userID);

          //Merge data with Mysql + MongoDB + Reviewer + Duration + Progress + Learning
          const mergeData = courseInfor.map((course) => {
            return {
              ...course,
              progress: progress ? progress : 0,
              videos: videos,
              review: review,
              keywords: mongoData[0].keywords,
              chapters: mongoData[0].chapters,
              learning: list_learning
            };
          });
          res.send(mergeData);
        });
      });
    }
  });

  router.post("/updateNewProgress", verifyToken, async (req, res) => {
    const { userID, lectureID, courseID, percent } = req.body.progress;

    if ((await isEnrolledCourse(courseID, userID)) && percent > 0) {
      const time = formatDateTime(new Date());
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err);
        } else {
          //Insert new data into table learning
          let query =
            "INSERT INTO learning (userID, lectureID, time, courseID, percent)\
                      VALUES (?, ?, ?, ?, ?)";
          connection.query(
            query,
            [userID, lectureID, time, courseID, percent],
            async (error) => {
              connection.release(); //Giải phóng connection khi truy vấn xong
              if (error) {
                res.status(500).send(error);
              }
              res.send("Ok");
            }
          );
        }
      });
    }
  });

  router.post("/acceptAssignment", verifyToken, async (req, res) => {
    const { language, sourceCode, testcases } = req.body;
    let wrongAns = null;
    let lang = language === "cplus" ? "c++" : language;
    for (const test of testcases) {
      const output = await callAPICompile(lang, sourceCode, test.case);
      const result = await compareResult(output, test.key);
      if (!result) {
        wrongAns = {
          testcase: test.case,
          expected: test.key,
          found: output
        };
        break;
      }
    }
    if (wrongAns == null) res.send(true);
    else res.send(wrongAns);
  });

  router.get("/findcourse", async (req, res) => {
    const { category, title, ratings, language, method, program, price } =
      req.query;

    connMysql.getConnection((err, connection) => {
      if (err) {
        res.status(500).send(err);
      }
      //Get detail information of course
      let query = `SELECT c.courseID,
                        u.fullname AS instructor,
                        type_of_course,
                        title,
                        method,
                        c.language,
                        price,
                        currency,
                        program,
                        category,
                        course_for,
                        status,
                        num_lecture as num_lectures,
                        avg.star,
                        avg.raters as number_reviews
                        FROM course AS c
                        LEFT JOIN user AS u ON c.userID = u.userID
                        LEFT JOIN avg_rating AS avg ON c.courseID = avg.courseID
                        WHERE status = 'published'
                                -- Find on search box  
                                and (
                                  u.fullname like ? or
                                  title like ? or
                                  course_for like ?
                                )
                                -- Find on filter
                                and (
                                    (avg.star >= ? or avg.star is null) and
                                    c.language like ? and 
                                    method like ? and 
                                    price >= ? and 
                                    program like ?
                                )
                                -- Find on category
                                and (
                                    category like ?
                                )
                        ORDER BY star DESC`;

      let queryParams = [
        `%${title}%`,
        `%${title}%`,
        `%${title}%`,
        ratings,
        `%${language}%`,
        `%${method}%`,
        price,
        `%${program}%`,
        `%${category}%`
      ];

      connection.query(query, queryParams, async (error, courseInfor) => {
        connection.release(); //Giải phóng connection khi truy vấn xong
        if (error) {
          res.status(500).send(error);
        }

        //List courseIDs which is results of previous query
        const courseIDs = courseInfor.map((course) => course.courseID);

        //Connect to MongoDB server
        await connMongo;
        //Get mongoData. MongoData wil be return an array which 1 element so we will get data at index 0
        const mongoData = await Course.find({
          courseID: { $in: courseIDs }
        }).select("courseID image_introduce keywords targets");

        //Merge data with Mysql + MongoDB + Reviewer + Duration + Progress + Learning
        const mergeData = courseInfor.map((course) => {
          const data = mongoData.find((mc) => mc.courseID === course.courseID);
          return {
            ...course,
            image_introduce: data ? data.image_introduce : null,
            keywords: data ? data.keywords : null,
            targets: data ? data.targets : null
          };
        });
        res.send(mergeData);
      });
    });
  });

  router.post("/addReview", verifyToken, async (req, res) => {
    const { courseID, userID, message, star, time } = req.body;
    if (!courseID || !userID || !message || !star || !time) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const formattedTime = formatDateTime(new Date(time));

    connMysql.getConnection((err, connection) => {
      if (err) {
        return res.status(500).send({ message: "Database failed to connect" });
      }

      // First, check if a review with the same courseID and userID already exists
      const checkQuery =
        "SELECT * FROM rating WHERE courseID = ? AND userID = ?";
      connection.query(checkQuery, [courseID, userID], (error, results) => {
        if (error) {
          connection.release();
          return res.status(500).send({ message: "Failed to check review" });
        }

        if (results.length > 0) {
          // If a review exists, update it
          const updateQuery =
            "UPDATE rating SET message = ?, star = ?, time = ? WHERE courseID = ? AND userID = ?";
          connection.query(
            updateQuery,
            [message, star, formattedTime, courseID, userID],
            (updateError) => {
              connection.release();
              if (updateError) {
                return res
                  .status(500)
                  .send({ message: "Failed to update review" });
              }

              res.send({
                success: true,
                message: "Review updated successfully"
              });
            }
          );
        } else {
          // If no review exists, insert a new one
          const insertQuery =
            "INSERT INTO rating (courseID, userID, message, star, time) VALUES (?, ?, ?, ?, ?)";
          connection.query(
            insertQuery,
            [courseID, userID, message, star, formattedTime],
            (insertError) => {
              connection.release();
              if (insertError) {
                return res
                  .status(500)
                  .send({ message: "Failed to add review" });
              }

              res.send({ success: true, message: "Review added successfully" });
            }
          );
        }
      });
    });
  });

  // test put file PDF to google cloud storage
  router.post("/uploadpdf", verifyToken, async (req, res) => {
    const { courseID, file } = req.body;
    try {
      await putFileToStorage(courseID, file);
      res.send(true);
    } catch (error) {
      res.send(false);
    }
  });

  return router;
};
