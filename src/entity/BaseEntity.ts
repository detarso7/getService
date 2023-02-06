import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


export abstract class BaseEntity{

    @PrimaryGeneratedColumn( "uuid")
    uid: number;

    @Column({ default: true})
    active: boolean;
    
    @Column({ default: false})
    deleted: boolean;
    
    @CreateDateColumn({ type: 'timestamp'})
    createAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updateAt: Date;

}