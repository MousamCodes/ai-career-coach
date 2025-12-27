import {Inngest} from "inngest"; 

//create a client to send and recieve events
export const inngest = new Inngest({ id: "preppal", name: "Preppal" });

//export the client
export default inngest;