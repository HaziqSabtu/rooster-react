// https://www.sanity.io/docs/image-url
// image url builder

import { client } from "./client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = (source) => {
    const builder = imageUrlBuilder(client);
    return builder.image(source);
};

export default imageBuilder;
