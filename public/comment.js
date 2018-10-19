module.exports = pageId => {
  return `
    <form method="post" action="/comment/${pageId}" class="create-container">
        <input name="nickName" class="create-input" type="text" placeholder="닉네임" required="required"/>
        <textarea name="content" class="create-input" placeholder="댓글 작성하기" required="required"></textarea>
        <button class="btn-buy" style="font-size: 1rem" type="submit">등록</button>
    </form>
`;
};
