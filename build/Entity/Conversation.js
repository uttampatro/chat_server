"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
var typeorm_1 = require("typeorm");
var Message_1 = require("./Message");
var Participant_1 = require("./Participant");
var Conversation = /** @class */ (function (_super) {
    __extends(Conversation, _super);
    function Conversation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", Number)
    ], Conversation.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "int" }),
        typeorm_1.Index(),
        __metadata("design:type", Number)
    ], Conversation.prototype, "last_message_id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Message_1.Message; }, function (message) { return message.conversation; }),
        __metadata("design:type", Array)
    ], Conversation.prototype, "messages", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Participant_1.Participant; }, function (participant) { return participant.conversation; }),
        __metadata("design:type", Array)
    ], Conversation.prototype, "participants", void 0);
    Conversation = __decorate([
        typeorm_1.Entity("conversations")
    ], Conversation);
    return Conversation;
}(typeorm_1.BaseEntity));
exports.Conversation = Conversation;
//# sourceMappingURL=Conversation.js.map