import NodeMediaServer from 'node-media-server';
import signale from "signale";
import config from "../../config";

class NodeMediaServerManager {
    constructor(nmsConfig, obsSwitcher) {
        if (!nmsConfig) {
            return;
        }

        try {
            console = signale.scope("NMS");
        } catch(e) {
            console.log = signale.scope("NMS").log;
            signale.scope("NMS").warn(`Couldn't set console for node-media-server. Consider upgrading to node 10 or higher to resolve this problem (error: ${e})`);
        }

        this.obsSwitcher = obsSwitcher;

        this.nodeMediaServer = new NodeMediaServer(nmsConfig);
        this.nodeMediaServer.run();

        if (config.rtmp && !config.rtmp.stats) {
            config.rtmp.server = "node-media-server";

            let auth = "";

            if (nmsConfig.auth && nmsConfig.auth.api) {
                auth = `${nmsConfig.auth.api_user}:${nmsConfig.auth.api_pass}@`;
            }

            if (nmsConfig.http) {
                config.rtmp.stats = `http://${auth}localhost:${nmsConfig.http.port}/api/streams`;
            }
            
            if (nmsConfig.https) {
                config.rtmp.stats = `https://${auth}localhost:${nmsConfig.https.port}/api/streams`;
            }
        }

        this.nodeMediaServer.on('postPublish', (id, StreamPath, args) => {
            obsSwitcher.switchSceneIfNecessary();
        });

        this.nodeMediaServer.on('donePublish', (id, StreamPath, args) => {
            obsSwitcher.switchSceneIfNecessary();
        });
    }
}

module.exports = NodeMediaServerManager;