import {User} from "./User";
import {Event} from "./Event";
import {Registration} from "./Registration";

User.hasMany(Event, {foreignKey: "organizerId", as: "organizedEvents"});
Event.belongsTo(User, {foreignKey: "organizerId", as: "organizer"});
User.hasMany(Registration, {foreignKey: "userId", as: "registrations"});
Event.hasMany(Registration, {foreignKey: "eventId", as: "registrations"});
Registration.belongsTo(User, {foreignKey: "userId", as: "user"});
Registration.belongsTo(Event, {foreignKey: "eventId", as: "event"});
export {User, Event, Registration};