import { MONGODB_URI } from "./util/secrets";
import Agenda from "agenda";

const agenda = new Agenda({ db: { address: MONGODB_URI } });

export default agenda;
