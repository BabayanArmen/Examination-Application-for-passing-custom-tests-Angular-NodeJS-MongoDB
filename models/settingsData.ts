import * as mongoose from 'mongoose'

const settingsDataSchema = new mongoose.Schema({
    timerTime: { minutes: Number, seconds: Number},
    categories: [ { category: String, numOfQuestions: Number} ]
})

const SettingsDataModel = mongoose.model('setting', settingsDataSchema);

export { SettingsDataModel }