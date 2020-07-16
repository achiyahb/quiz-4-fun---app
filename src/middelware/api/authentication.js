import RtdbFirebase from "./RtdbFirebase";

export default {
    createClient
}

function createClient(self, clid){
    const path = RtdbFirebase.pathForClient(self,4,clid)
    RtdbFirebase.writeData('resign',path)
}