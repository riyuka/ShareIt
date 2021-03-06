const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function feed(parent, args, ctx, info) {
  const { filter, first, skip, orderBy } = args // destructure input arguments

  const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {}

  const allLinks = await ctx.db.query.links({})
  const count = allLinks.length

  const queriedLinks = await ctx.db.query.links({ where, skip: args.skip, first: args.first, orderBy: args.orderBy })

  return {
    linkIds: queriedLinks.map(link => link.id),
    count,
    orderBy: orderBy || 'createdAt_DESC'
  }
}

async function userInfo(parent, args, ctx, info) {

  const id = getUserId(ctx)
  return ctx.db.query.user({ where: { id } }, info)


}


module.exports = {
  feed,
  userInfo
}
