import path from 'path';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) { //, res: NextApiResponse) {
  //console.log(req);
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/test.json', 'utf8');
  //Return the content of the data file in json format
  return NextResponse.json(JSON.parse(fileContents));
  //res.status(200).json(fileContents);
  // res.json(fileContents);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/test.json', 'utf8');
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
}

export async function PUT() {
  console.log("PUT called")
  return "Foo";
}

// import { NextResponse } from 'next/server'

// export async function GET(request: Request) {
//   //Find the absolute path of the json directory
//   const jsonDirectory = path.join(process.cwd(), 'json');
//   //Read the json data file data.json
//   const fileContents = await fs.readFile(jsonDirectory + '/test.json', 'utf8');
//   //Return the content of the data file in json format

//   // if (!sessionId) {
//   //   return NextResponse.json({ id: null }, { status: 401 })
//   // }
//   return NextResponse.json({body: fileContents}, {status: 200});
// }