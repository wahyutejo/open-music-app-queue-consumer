class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { targetEmail, playlistId } = JSON.parse(message.content.toString());

      const playlist = await this._playlistService.getPlaylist(playlistId);
      const song = await this._playlistService.getSongsFromPlaylist(playlistId);

      const data = {
        playlist: {
          ...playlist,
          song,
        },
      };

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(data));

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
