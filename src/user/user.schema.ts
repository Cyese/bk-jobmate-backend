import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument, Model, Document } from 'mongoose';

export type SkillDocument = HydratedDocument<Skill>;
export type ExperienceDocument = HydratedDocument<Experience>;
export type UserDocument = HydratedDocument<User>;

class Expertise {
  @Prop({ required: true })
  ExpertiseID: string;

  @Prop({ required: true })
  Name: string;
}

class Period {
  @Prop({ required: true })
  Start: Date;

  @Prop({ required: true })
  End: Date;
}

@Schema()
export class Skill {
  @Prop({ required: true })
  Expertise: Expertise;

  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  Description: string;
}

@Schema()
export class Experience {
  @Prop({ type: String, required: true })
  UserID: string;

  @Prop({ required: true })
  Period: Period;

  @Prop({ required: false })
  JobRole: string;

  @Prop({ required: false })
  Description: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema()
export class User {
  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  Avatar: string; // To be implemented, path to store avatar on server

  @Prop({ required: true, unique: true })
  UserID: string;

  @Prop({ type: [Skill], required: false })
  SkillSet: Skill[];

  @Prop({ required: false })
  JobRole: string; // Quick Fetch current Job
}

export const UserSchema = SchemaFactory.createForClass(User);
