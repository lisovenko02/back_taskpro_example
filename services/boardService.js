import { Board } from '../models/boardModel.js'
import { User } from '../models/userModel.js'
import { Column } from '../models/columnModel.js'

async function addBoard(req, user) {
  const result = await Board.create({ ...req.body, user })
  console.log(result)
  await User.findByIdAndUpdate(
    user._id,
    {
      // $push: { boards: result._id},
      $push: {
        boards: { _id: result._id, title: result.title, icon: result.icon },
      },
    },
    { new: true }
  )
  return result
}

async function getBoard(id) {
  // const result = await Board.findById(id)
  const result = await Board.findById(id).populate({
    path: 'columns',
    select: {
      _id: 1,
      updatedAt: 1,
      title: 1,
      //tasks: 1,
    },
    // populate: {
    //   path: "tasks",
    //   select: {
    //     _id: 1,
    //     updatedAt: 1,
    //     title: 1,
    //     description: 1,
    //     priority: 1,
    //     deadline: 1,
    //   },
    // },
  })
  return result
}

async function upBoard(id, req) {
  const resBoard = await Board.findByIdAndUpdate(id, req.body, { new: true })

  const index = req.user.boards.findIndex(
    (board) => board._id.toString() === id
  )

  if (index !== -1) {
    req.user.boards[index] = {
      _id: resBoard._id,
      title: req.body.title,
      icon: req.body.icon,
    }

    const resUser = await User.findOneAndUpdate(
      { _id: req.user._id, 'boards._id': id },
      { $set: { boards: req.user.boards } },
      { new: true }
    )

    return { resBoard, resUser }
  } else {
    return null
  }
}

async function delBoard(id, req) {
  const result = await Board.findByIdAndDelete(id)

  await User.updateOne(
    {
      _id: req.user._id,
    },
    { $pull: { boards: { _id: id } } }
  )
  await Column.deleteMany({ board: id })

  return result
}

export { addBoard, getBoard, upBoard, delBoard }
