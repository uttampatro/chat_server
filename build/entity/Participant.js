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
exports.Participant = void 0;
var typeorm_1 = require("typeorm");
var Conversation_1 = require("./Conversation");
var User_1 = require("./User");
var Participant = /** @class */ (function (_super) {
    __extends(Participant, _super);
    function Participant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn("int"),
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.username; }),
        typeorm_1.JoinColumn({ name: "user_id" }),
        __metadata("design:type", User_1.User)
    ], Participant.prototype, "user", void 0);
    __decorate([
        typeorm_1.PrimaryColumn("int"),
        typeorm_1.ManyToOne(function () { return Conversation_1.Conversation; }, function (conversation) { return conversation.id; }),
        typeorm_1.JoinColumn({ name: "conversation_id" }),
        __metadata("design:type", Conversation_1.Conversation)
    ], Participant.prototype, "conversation", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Participant.prototype, "messages_read_at", void 0);
    Participant = __decorate([
        typeorm_1.Entity("participants")
    ], Participant);
    return Participant;
}(typeorm_1.BaseEntity));
exports.Participant = Participant;
//# sourceMappingURL=Participant.js.map