import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IPvcEvaluation } from '@/common/interfaces/pvcEvaluation.interface';

export type PodEvaluationCreationAttributes = Optional<
  IPvcEvaluation,
  'pvcEvaluationKey' | 'pvcName' | 'pvcAnomalyEvaluation' | 'createdAt' | 'evaluatedAt' | 'pvcMetricKey' | 'clusterId'
>;

export class PvcEvaluationModel extends Model<IPvcEvaluation, PodEvaluationCreationAttributes> implements IPvcEvaluation {
  public createdAt: Date;
  public pvcEvaluationKey: number;
  public pvcName: string;
  public clusterId: string;
  public pvcAnomalyEvaluation: boolean;
  public evaluatedAt: Date;
  public updatedAt: Date;
  public pvcMetricKey: number;
}

export default function (sequelize: Sequelize): typeof PvcEvaluationModel {
  PvcEvaluationModel.init(
    {
      pvcEvaluationKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      pvcName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      pvcAnomalyEvaluation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },

      createdAt: {
        type: DataTypes.DATE(),
        allowNull: false,
      },

      evaluatedAt: {
        type: DataTypes.DATE(),
      },

      updatedAt: {
        type: DataTypes.DATE(),
      },

      pvcMetricKey: {
        type: DataTypes.INTEGER,
      },

      clusterId: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['pvc_name'],
        },
        {
          unique: false,
          fields: ['evaluated_at'],
        },
      ],
      tableName: 'PvcEvaluation',
      modelName: 'PvcEvaluation',
      sequelize,
    },
  );
  return PvcEvaluationModel;
}
