"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const POST = async (req, rep) => {
    if (req.body.name === "Jon Doe") {
        /**
         * in async function, you can return undefined if you already sent a response
         * then it won't try to send a response again with the returned value;
         */
        rep.status(400).send({ message: "Name can not be Jon Doe" });
        return;
    }
    return { userId: req.params.id };
};
exports.POST = POST;
exports.POST.opts = {
    schema: {
        body: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
            },
            required: ["name"],
        },
    },
};
