import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import createError from 'http-errors';
import { getAuctionById } from './getAuction';
import { uploadPictureToS3 } from '../lib/uploadPictureToS3';
import { setAuctionPictureUrl } from '../lib/setAuctionPictureUrl';
import uploadPictureSchema from '../lib/schemas/uploadPictureSchema';


export async function uploadAuctionPicture(event) {
    const { id } = event.pathParameters;
    const { email } = event.requestContext.authorizer;
    const auction = await getAuctionById(id);
    
    // Validate auction ownsership
    if (email != auction.seller) {
        throw new createError.Forbidden(`You're not allowed to upload a picture in this auction. Is not yours!!`);
    };
    
    const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    
    let updateAuction;
    
    try {
        const pictureUrl = await uploadPictureToS3(auction.id + '.jpg', buffer);
        //Set pictureUrl into auction data
        updateAuction = await setAuctionPictureUrl(auction.id, pictureUrl);
        
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
    

    
    return {
        statusCode: 200,
        body: JSON.stringify(updateAuction),
    };
}

export const handler = middy(uploadAuctionPicture)
    .use(httpErrorHandler())
    .use(validator({ inputSchema: uploadPictureSchema }));