import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IPvcTraining } from '@/common/interfaces/pvcTraining.interface';

export type PvcTrainingCreationAttributes = Optional<
  IPvcTraining,
  | 'pvcTrainingKey'
  | 'trainingTimestamp'
  | 'pvcUtilization'
  | 'pvcStatus'
  | 'kubelet_volume_stats_available_bytes'
  | 'kubelet_volume_stats_capacity_bytes'
  | 'kube_persistentvolumeclaim_status_lost'
  | 'kube_persistentvolumeclaim_status_pending'
  | 'kube_persistentvolumeclaim_status_failed'
  | 'createdAt'
  | 'updatedAt'
>;

export class PvcTrainingModel extends Model<IPvcTraining, PvcTrainingCreationAttributes> implements IPvcTraining {
  public pvcTrainingKey: number;
  public trainingTimestamp: Date;
  public pvcUtilization: number;
  public pvcStatus: number;
  public kubelet_volume_stats_available_bytes: number;
  public kubelet_volume_stats_capacity_bytes: number;
  public kube_persistentvolumeclaim_status_lost: number;
  public kube_persistentvolumeclaim_status_pending: number;
  public kube_persistentvolumeclaim_status_failed: number;
  public createdAt: Date;
  public updatedAt: Date;
}

export default function (sequelize: Sequelize): typeof PvcTrainingModel {
  PvcTrainingModel.init(
    {
      pvcTrainingKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      trainingTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pvcUtilization: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      pvcStatus: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      kubelet_volume_stats_available_bytes: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      kubelet_volume_stats_capacity_bytes: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      kube_persistentvolumeclaim_status_lost: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      kube_persistentvolumeclaim_status_pending: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      kube_persistentvolumeclaim_status_failed: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['training_timestamp'],
        },
      ],
      tableName: 'PvcTraining',
      modelName: 'PvcTraining',
      sequelize,
    },
  );
  return PvcTrainingModel;
}
