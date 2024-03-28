import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as userService from './user.service';

// const accessKeyId = 'AKIASAZF4KVXGYXY5SMV';
// const secretAccessKey = '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';
// const region = 'Asia Pacific (Mumbai) ap-south-1';
// const Bucket = 'pgmgmttool-bucket';

// const s3 = new AWS.S3({
//   region: BUCKET_REGION,
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
// });

// function multipart(request: any) {
//   // eslint-disable-next-line no-async-promise-executor
//   return new Promise<void>(async (resolve, reject) => {
//     const { headers } = request;
//     const busboy = Busboy({ headers });
//     // you may need to add cleanup logic using 'busboy.on' events
//     busboy.on('error', (err: any) => reject(err));
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     busboy.on('file', function (_fieldName: any, fileStream: any, fileName: any, _encoding: any, _mimeType: any) {
//       const params = {
//         Bucket: BUCKET_NAME,
//         Key: fileName,
//         Body: fileStream,
//       };
//       s3.upload(params)
//         .promise()
//         .then(() => resolve());
//     });
//     request.pipe(busboy);
//   });
// }

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    const user = await userService.getUserById(new mongoose.Types.ObjectId(req.params['userId']));
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
  }
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    const user = await userService.updateUserById(new mongoose.Types.ObjectId(req.params['userId']), req.body);
    res.status(200).send({ result: 'Success!', user });
  }
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    await userService.deleteUserById(new mongoose.Types.ObjectId(req.params['userId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
