import { NewisPage } from './app.po';

describe('newis App', () => {
  let page: NewisPage;

  beforeEach(() => {
    page = new NewisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
