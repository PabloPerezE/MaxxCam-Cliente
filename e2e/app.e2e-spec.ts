import { MaxxcamPage } from './app.po';

describe('maxxcam App', function() {
  let page: MaxxcamPage;

  beforeEach(() => {
    page = new MaxxcamPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
