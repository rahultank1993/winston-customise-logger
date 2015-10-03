/**
 * Created by rahul on 29/9/15.
 */
var winston = require('winston')
    , moment = require('moment')
    , General = require('./generalMethods.js')
    , config = require('config');

require('winston-mongodb').MongoDB;
require('winston-mail').Mail;
var custom = function(){
    this.path = General.getPath(config.get("log-directory"));
    General.createDir(this.path);
    this.envMail = config.get("email");
    this.mailOption = {
        to:this.envMail.to,
        from:this.envMail.from,
        host:this.envMail.host,
        username:this.envMail.username,
        password:this.envMail.password
    };
    if(this.envMail.ssl == true) this.mailOption.ssl= true;
    if(this.envMail.tls == true) this.mailOption.tls = true;
    if(this.envMail.subject != "") this.mailOption.subject = this.envMail.subject;
    if(this.envMail.html == true) this.mailOption.html = this.envMail.html;

    this.clConsole = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                colorize : config.get("colorize"),
                timestamp:function(){
                    return moment().format(config.get("date-time-formate"));
                }
            })
        ],
        exceptionHandlers: [
            new winston.transports.File({
                filename: this.path +'/exceptions.log',
                handleExceptions : true,
                humanReadableUnhandledException : true,
                json : config.get("json-formate")
            }),
            new winston.transports.MongoDB({
                db:config.get("mongodb.db"),
                username : config.get("mongodb.username"),
                password : config.get("mongodb.password"),
                storeHost:config.get("mongodb.storeHost"),
                handleExceptions : true,
                collection:config.get("mongodb.error-collection")
            })
        ]
    });
    this.clMongo = new (winston.Logger)({
        transports: [
            new winston.transports.MongoDB({
                db:config.get("mongodb.db"),
                username : config.get("mongodb.username"),
                password : config.get("mongodb.password"),
                storeHost:config.get("mongodb.storeHost"),
                collection : config.get("mongodb.collection"),
                label:config.get("mongodb.label")
            })
        ],
        exitOnError: config.get("exit-on-error")
    });
    this.clMail = new (winston.Logger)({
        transports: [
            new winston.transports.Mail(this.mailOption)
        ],
        exitOnError: config.get("exit-on-error")
    });
    this.clSilly = new (winston.Logger)({
        transports: [
            new winston.transports.DailyRotateFile({
                name:'silly',
                level:'silly',
                filename: this.path + '/silly.log' ,
                timestamp:function(){
                    return moment().format(config.get("date-time-formate"));
                },
                json: config.get("json-formate"),
                datePattern: config.get("file-rotate-date-formate"),
                maxFiles : config.get("max-files"),
                maxsize : config.get("files-size")
            })
        ],
        exitOnError: config.get("exit-on-error")
    });
    this.clDebug = new (winston.Logger)({
        transports: [
            new winston.transports.DailyRotateFile({
                name:'debug',
                level:'debug',
                filename: this.path + '/debug.log' ,
                timestamp:function(){
                    return moment().format(config.get("date-time-formate"));
                },
                json: config.get("json-formate"),
                datePattern: config.get("file-rotate-date-formate"),
                maxFiles : config.get("max-files"),
                maxsize : config.get("files-size")
            })
        ],
        exitOnError: config.get("exit-on-error")
    });
    this.clVerbose = new (winston.Logger)({
        transports: [
            new winston.transports.DailyRotateFile({
                name:'verbose',
                level:'verbose',
                filename: this.path + '/verbose.log' ,
                timestamp:function(){
                    return moment().format(config.get("date-time-formate"));
                },
                json: config.get("json-formate"),
                datePattern: config.get("file-rotate-date-formate"),
                maxFiles : config.get("max-files"),
                maxsize : config.get("files-size")
            })
        ],
        exitOnError: config.get("exit-on-error")
    });
    this.clInfo = new (winston.Logger)({
        transports: [
            new winston.transports.DailyRotateFile({
                name:'info',
                level:'info',
                filename: this.path + '/info.log' ,
                timestamp:function(){
                    return moment().format(config.get("date-time-formate"));
                },
                json: config.get("json-formate"),
                datePattern: config.get("file-rotate-date-formate"),
                maxFiles : config.get("max-files"),
                maxsize : config.get("files-size")
            })
        ],
        exitOnError: config.get("exit-on-error")
    });
    this.clWarn = new (winston.Logger)({
        transports: [
            new winston.transports.DailyRotateFile({
                name:'warn',
                level:'warn',
                filename: this.path + '/warn.log' ,
                timestamp:function(){
                    return moment().format(config.get("date-time-formate"));
                },
                json: config.get("json-formate"),
                datePattern: config.get("file-rotate-date-formate"),
                maxFiles : config.get("max-files"),
                maxsize : config.get("files-size")
            })
        ],
        exitOnError: config.get("exit-on-error")
    });
    this.clError = new (winston.Logger)({
        transports: [
            new winston.transports.DailyRotateFile({
                name:'error',
                level:'error',
                filename: this.path + '/error.log' ,
                timestamp:function(){
                    return moment().format(config.get("date-time-formate"));
                },
                json: config.get("json-formate"),
                datePattern: config.get("file-rotate-date-formate"),
                maxFiles : config.get("max-files"),
                maxsize : config.get("files-size")
            })
        ],
        exitOnError: config.get("exit-on-error")
    });
};

module.exports = new custom();
