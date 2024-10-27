import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "admin" })
class AdminEntity {
    @PrimaryGeneratedColumn({ name: 'admin_id' })
    adminId!: number;

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true, nullable: false })
    email!: string;

    @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
    password!: string;

    @Column({ name: 'nome', type: 'varchar', length: 100, nullable: false })
    nome!: string;
}

export default AdminEntity;
