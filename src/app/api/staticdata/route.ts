import path from 'path';
import { promises as fs, writeFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import ShopifyToDoItemList from '@/app/models/shopify-todo-item-list';

//Set the absolute path of the json directory
const jsonDirectory = path.join(process.cwd(), 'json');
const tmpDirectory = path.join(process.cwd(), 'tmp');
const fileName = "/demo-todo.json";

export async function GET(req: NextRequest) { //, res: NextApiResponse) {
  //Read the json data file data.json
  await checkToDoTempExists();
  const fileContents = await fs.readFile(tmpDirectory + fileName, 'utf8');
  //Return the content of the data file in json format
  return NextResponse.json(JSON.parse(fileContents));
}

export async function PUT(req: NextRequest) {
  //console.log(await req.json());
  const json = await req.json();
  const todoItems:ShopifyToDoItemList = json.todoItems
  // Save the file.
  saveToDoState(todoItems);
  //Read the json data file data.json
  const fileContents = await fs.readFile(tmpDirectory + fileName, 'utf8');
  //Return the content of the data file in json format
  return NextResponse.json(JSON.parse(fileContents));  
}

export async function DELETE(req: NextRequest) {
  // Ideally, we would have an actual API call that would delete the item on the backend.
  // For the purposes of this demo, we just remove the subtask and resave the JSON file.
  const json = await req.json();
  const todoItems:ShopifyToDoItemList = json.todoItems
  // Save the file.
  saveToDoState(todoItems);
  //Read the json data file data.json
  const fileContents = await fs.readFile(tmpDirectory  + fileName, 'utf8');
  //Return the content of the data file in json format
  return NextResponse.json(JSON.parse(fileContents));  
}

async function checkToDoTempExists() {
  try {
    await fs.readFile(tmpDirectory  + fileName, 'utf8');
  } catch {
    const fileContents = await fs.readFile(jsonDirectory  + fileName, 'utf8');
    writeFileSync(tmpDirectory + fileName, fileContents, 'utf8');
  }
}

function saveToDoState(data: ShopifyToDoItemList) {
  writeFileSync(tmpDirectory + fileName, JSON.stringify(data, null, 2), 'utf8');
}