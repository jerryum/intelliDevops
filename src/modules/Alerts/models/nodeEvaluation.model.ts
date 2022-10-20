import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { INodeEvaluation } from '@/common/interfaces/nodeEvaluation.interface';

export type NodeEvaluationCreationAttributes = Optional<
  INodeEvaluation,
  'nodeEvaluationKey' | 'nodeName' | 'nodeAnonamlyEvaluaton' | 'createdAt' | 'evaluatedAt'
>;

export class NodeEvaluationModel extends Model<INodeEvaluation, NodeEvaluationCreationAttributes> implements INodeEvaluation {
  public createdAt: Date;
  public nodeEvaluationKey: number;
  public nodeName: string;
  public nodeAnonamlyEvaluaton: boolean;
  public evaluatedAt: Date;
}

export default function (sequelize: Sequelize): typeof NodeEvaluationModel {
  NodeEvaluationModel.init(
    {
      nodeEvaluationKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      nodeName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      nodeAnonamlyEvaluaton: {
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
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['node_name'],
        },
        {
          unique: false,
          fields: ['evaluated_at'],
        },
      ],
      tableName: 'NodeEvaluation',
      modelName: 'NodeEvaluation',
      sequelize,
    },
  );
  return NodeEvaluationModel;
}
