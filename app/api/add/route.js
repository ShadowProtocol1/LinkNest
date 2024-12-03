import clientPromise from "@/lib/mongodb"

const db_name = process.env.DB_NAME
const collection_name = process.env.COLLECTION

export async function POST(request) {
  const body = await request.json()


  const client = await clientPromise;
  const db = client.db(db_name)
  const collection = db.collection(collection_name)

  // If the handle is already claimed, you cannot create the bittree
  const doc = await collection.findOne({ handle: body.handle })

  if (doc) {
    return Response.json({ success: false, error: true, message: 'This Bittree already exists!', result: null })
  }

  const result = await collection.insertOne(body)

  return Response.json({ success: true, error: false, message: 'Your Bittree has been generated!', result: result, })
}
