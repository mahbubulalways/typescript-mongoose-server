import config from './app/config';
import app from './app';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://level2project1:3VGLN8LyqbpRnn8f@cluster0.jgce6rp.mongodb.net/first-project?retryWrites=true&w=majority',
    );

    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
