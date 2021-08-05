"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.TicketPriority = exports.TicketStatus = exports.TicketTypes = void 0;
var TicketTypes;
(function (TicketTypes) {
    TicketTypes["Bug"] = "BUG";
    TicketTypes["Feature"] = "FEATURE";
    TicketTypes["Docs"] = "DOCS";
})(TicketTypes = exports.TicketTypes || (exports.TicketTypes = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["Open"] = "OPEN";
    TicketStatus["Assigned"] = "ASSIGNED";
    TicketStatus["Testing"] = "TESTING";
    TicketStatus["Resolved"] = "RESOLVED";
})(TicketStatus = exports.TicketStatus || (exports.TicketStatus = {}));
var TicketPriority;
(function (TicketPriority) {
    TicketPriority["Unknown"] = "UNKNOWN";
    TicketPriority["Low"] = "LOW";
    TicketPriority["Medium"] = "MEDIUM";
    TicketPriority["High"] = "HIGH";
    TicketPriority["Critical"] = "CRITICAL";
})(TicketPriority = exports.TicketPriority || (exports.TicketPriority = {}));
var UserType;
(function (UserType) {
    UserType["Admin"] = "ADMIN";
    UserType["ProjectManager"] = "PROJECT_MANAGER";
    UserType["Programmer"] = "PROGRAMMER";
    UserType["Tester"] = "TESTER";
})(UserType = exports.UserType || (exports.UserType = {}));
//# sourceMappingURL=MutationTypes.js.map