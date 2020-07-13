import { Request, Response } from 'express';
import { SettingsDataModel } from '../models/settingsData';


export class SettingsContoller {

    static async resetSettings(req: Request, res: Response) {
        // console.log(req.body)
        // const settingsReset = new SettingsDataModel({
        //     timerTime: {},
        //     categories: [{category: 'no category', numOfQuestions: 0}]
        // })
        try{
            await SettingsDataModel.deleteMany({});
            // await settingsReset.save();
            // const settings = await SettingsDataModel.findOne();
            res.status(200).json({message: 'reset successfull'})
        }catch{(e) => console.log(e)}
        
    };

    static async getSettings(req: Request, res: Response) {
        try{
            const settings = await SettingsDataModel.findOne();
            if(!settings){
                res.status(204).json({haveSettings: false, settings})
            }else {
                res.status(200).json({haveSettings: true , settings })
            }
        }catch{(e) => console.log(e)}
    };

    static async addCategory(req: Request, res: Response) {
        // console.log(req.params.id);
        // console.log(req.body.newCategory)
            const settingsOBJ = await SettingsDataModel.findOne();
            if(!settingsOBJ) {
                try{
                    const settingsNewObj = new SettingsDataModel({
                        timerTime: {minutes: 0, seconds: 0},
                        categories: [{category: req.body.newCategory, numOfQuestions: 0}]
                    })
                    await settingsNewObj.save();
                    // await SettingsDataModel.updateOne(
                    //     {_id: settingsNewObj._id},
                    //     {$push: { categories: {category: req.body.newCategory, numOfQuestions: 0} }}
                    // );
                    res.status(200).json({message: 'category added'}); 
                }catch{ (e) => console.log(e)}
 
            }else{
                try{
                    // console.log(settingsOBJ);
                    await SettingsDataModel.updateOne(
                        {_id: req.params.id},
                        {$push: { categories: {category: req.body.newCategory, numOfQuestions: 0} }}
                    );
                    res.status(200).json({message: 'category added'}); 
                }catch{(e) => console.log(e)}
            }
    };

    static async addNumForCat(req: Request, res: Response) {
        // console.log(req.params.id);
        // console.log(req.body.category)
        // console.log(req.body.numOfQuestions)
        try{
            /////////////////////////////////////////////////////
            //////////// here we updating all object of array //////////
            // await SettingsDataModel.updateOne(
            //     { _id: req.params.id, "categories.category": req.body.category },
            //     { $set: { "categories.$" : {category: req.body.category, numOfQuestions: req.body.numOfQuestions} } }
            //  )
            /////////////////////////////////////////////////////////////////
            ////////////// here we updating only specefic field of array ////
            await SettingsDataModel.updateOne(
                { _id: req.params.id, "categories.category": req.body.category },
                { $set: { "categories.$.numOfQuestions" : req.body.numOfQuestions } }
             )
            res.status(200).json({message: 'Number of questions added'});    
        }catch{(e) => console.log(e)}
        
    }

    static async removeCategory(req: Request, res: Response) {
        // console.log(req.params.id)
        // console.log(req.body.category)
        try{
            await SettingsDataModel.updateOne(
                {_id: req.params.id},
                { $pull: { categories: { category: req.body.category} } },
            );
        res.json({message: 'Category removed'});
        }catch{(e) => console.log(e)}
    }

    static async addTimeTime(req: Request, res: Response) {
        // console.log(req.body.minutes);
        // console.log(req.body.secundes);
        const settingsOBJ = await SettingsDataModel.findOne();
        if(!settingsOBJ){
            try{
                const settingsNewObj = new SettingsDataModel({
                    timerTime: {minutes: req.body.minutes, seconds: req.body.seconds},
                    categories: []
                })
                await settingsNewObj.save();
                res.status(200).json({message: 'timer time added'});
            }catch{e => console.log(e)}
        }else{
            try{
                await SettingsDataModel.updateOne(
                    {_id: req.params.id},
                    {$set: { timerTime: {minutes: req.body.minutes, seconds: req.body.seconds}}}
                )
                res.status(200).json({message: 'timer time added'});
            }catch{(e) => {console.log(e)}}
        }
    };

}