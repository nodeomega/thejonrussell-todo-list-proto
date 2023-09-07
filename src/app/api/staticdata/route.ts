import path from 'path';
import { promises as fs, writeFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import ShopifyToDoItemList from '@/app/models/shopify-todo-item-list';

//Set the absolute path of the json directory
const jsonDirectory = path.join(process.cwd(), 'json');

export async function GET(req: NextRequest) { //, res: NextApiResponse) {
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/phoenixia-astrology-store-seo-todo.json', 'utf8');
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
  const fileContents = await fs.readFile(jsonDirectory + '/phoenixia-astrology-store-seo-todo.json', 'utf8');
  //Return the content of the data file in json format
  return NextResponse.json(JSON.parse(fileContents));  
}

function saveToDoState(data: ShopifyToDoItemList) {
  writeFileSync(jsonDirectory + '/phoenixia-astrology-store-seo-todo.json', JSON.stringify(data, null, 2), 'utf8');
}